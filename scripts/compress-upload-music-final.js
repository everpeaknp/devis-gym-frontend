const cloudinary = require('cloudinary').v2;
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');
const path = require('path');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'ufiebboc',
  api_key: '737261635528765',
  api_secret: 'FgF_Hog6T5oP_SImydd0u_MnV90',
  secure: true
});

const musicPath = path.join(__dirname, '..', 'public', 'music.mp3');
const compressedPath = path.join(__dirname, '..', 'public', 'music-compressed.mp3');

async function compressAudio() {
  return new Promise((resolve, reject) => {
    const originalSize = fs.statSync(musicPath).size;
    console.log(`Original file: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log('Compressing audio to 96kbps...\n');
    
    ffmpeg(musicPath)
      .audioBitrate('96k')
      .audioChannels(2)
      .audioFrequency(44100)
      .format('mp3')
      .on('start', (cmd) => {
        console.log('Starting compression...');
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          process.stdout.write(`\rProgress: ${Math.round(progress.percent)}%`);
        }
      })
      .on('end', () => {
        console.log('\n');
        const compressedSize = fs.statSync(compressedPath).size;
        console.log(`✓ Compression complete!`);
        console.log(`Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`Compressed: ${(compressedSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`Saved: ${((originalSize - compressedSize) / 1024 / 1024).toFixed(2)}MB\n`);
        resolve(compressedPath);
      })
      .on('error', (err) => {
        console.error('\n✗ Compression failed:', err.message);
        reject(err);
      })
      .save(compressedPath);
  });
}

async function uploadMusic(filePath) {
  try {
    const fileSize = fs.statSync(filePath).size;
    console.log(`Uploading to Cloudinary (${(fileSize / 1024 / 1024).toFixed(2)}MB)...`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'devis-gym',
      resource_type: 'raw',
      public_id: 'music',
      overwrite: true
    });
    
    console.log('✓ Upload successful!');
    console.log(`URL: ${result.secure_url}\n`);
    
    return result.secure_url;
  } catch (error) {
    console.error('✗ Upload failed:', error.message);
    throw error;
  }
}

async function findAndReplace(cloudinaryUrl) {
  console.log('Finding files that use /music.mp3...\n');
  
  const projectRoot = path.join(__dirname, '..');
  const extensions = ['.tsx', '.ts', '.jsx', '.js'];
  const excludeDirs = ['node_modules', '.next', '.git', 'scripts', 'public'];
  
  function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !excludeDirs.includes(file)) {
        getAllFiles(filePath, fileList);
      } else if (extensions.includes(path.extname(file))) {
        fileList.push(filePath);
      }
    });
    return fileList;
  }
  
  const files = getAllFiles(projectRoot);
  let replacements = 0;
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    const originalContent = content;
    
    // Replace all variations
    content = content.replace(/(['"`])\/music\.mp3\1/g, `$1${cloudinaryUrl}$1`);
    content = content.replace(/src=(['"`])\/music\.mp3\1/g, `src=$1${cloudinaryUrl}$1`);
    content = content.replace(/href=(['"`])\/music\.mp3\1/g, `href=$1${cloudinaryUrl}$1`);
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf-8');
      const relativePath = path.relative(projectRoot, file);
      console.log(`✓ Updated: ${relativePath}`);
      replacements++;
    }
  });
  
  if (replacements === 0) {
    console.log('No files found using /music.mp3');
  } else {
    console.log(`\n✓ Updated ${replacements} file(s)`);
  }
}

async function main() {
  try {
    // Compress the audio
    const compressed = await compressAudio();
    
    // Check if compressed file is under 10MB
    const compressedSize = fs.statSync(compressed).size;
    if (compressedSize > 10485760) {
      console.error('✗ Compressed file still too large for Cloudinary free tier.');
      console.log('Please upgrade your Cloudinary plan or use a different hosting service.');
      fs.unlinkSync(compressed);
      return;
    }
    
    // Upload to Cloudinary
    const cloudinaryUrl = await uploadMusic(compressed);
    
    // Find and replace in code
    await findAndReplace(cloudinaryUrl);
    
    // Clean up compressed file
    fs.unlinkSync(compressed);
    console.log('\n✓ Temporary compressed file cleaned up');
    
    // Replace original with compressed version
    fs.unlinkSync(musicPath);
    console.log('✓ Original music.mp3 deleted from /public\n');
    
    console.log('='.repeat(50));
    console.log('✓ COMPLETE!');
    console.log('='.repeat(50));
    console.log(`Music file uploaded to: ${cloudinaryUrl}`);
    console.log('All code references updated.');
    console.log('Original file deleted from /public folder.');
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    // Clean up on error
    if (fs.existsSync(compressedPath)) {
      fs.unlinkSync(compressedPath);
    }
  }
}

main();
