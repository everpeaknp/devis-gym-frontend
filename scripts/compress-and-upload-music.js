const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

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
    console.log('Compressing audio file...');
    console.log('Note: This requires ffmpeg to be installed on your system.\n');
    
    // Try to compress using ffmpeg with lower bitrate
    const ffmpeg = spawn('ffmpeg', [
      '-i', musicPath,
      '-b:a', '64k',  // 64kbps bitrate (much lower quality but smaller)
      '-y',           // Overwrite output file
      compressedPath
    ]);
    
    ffmpeg.stderr.on('data', (data) => {
      // ffmpeg outputs to stderr
      console.log(data.toString());
    });
    
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        const originalSize = fs.statSync(musicPath).size;
        const compressedSize = fs.statSync(compressedPath).size;
        console.log(`\n✓ Compression complete!`);
        console.log(`Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`Compressed: ${(compressedSize / 1024 / 1024).toFixed(2)}MB\n`);
        resolve(compressedPath);
      } else {
        reject(new Error(`ffmpeg failed with code ${code}`));
      }
    });
    
    ffmpeg.on('error', (err) => {
      reject(new Error('ffmpeg not found. Please install ffmpeg or compress manually.'));
    });
  });
}

async function uploadMusic(filePath) {
  try {
    const fileSize = fs.statSync(filePath).size;
    console.log(`Uploading music.mp3 (${(fileSize / 1024 / 1024).toFixed(2)}MB)...`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'devis-gym',
      resource_type: 'raw',
      public_id: 'music',
      use_filename: true,
      unique_filename: false,
      overwrite: true
    });
    
    console.log('✓ Upload successful!');
    console.log(`URL: ${result.secure_url}`);
    
    return result.secure_url;
  } catch (error) {
    console.error('✗ Upload failed:', error.message);
    throw error;
  }
}

async function main() {
  try {
    // Check if ffmpeg is available
    const fileSize = fs.statSync(musicPath).size;
    console.log(`Original file: ${(fileSize / 1024 / 1024).toFixed(2)}MB`);
    
    if (fileSize > 10485760) {
      console.log('File exceeds 10MB limit. Attempting compression...\n');
      const compressed = await compressAudio();
      
      const compressedSize = fs.statSync(compressed).size;
      if (compressedSize > 10485760) {
        console.error('✗ Compressed file still too large. Cannot upload.');
        return;
      }
      
      const url = await uploadMusic(compressed);
      
      // Clean up compressed file
      fs.unlinkSync(compressed);
      
      console.log(`\n✓ Complete! Update your code with:`);
      console.log(`Old: /music.mp3`);
      console.log(`New: ${url}`);
    } else {
      await uploadMusic(musicPath);
    }
  } catch (error) {
    if (error.message.includes('ffmpeg not found')) {
      console.log('\n' + '='.repeat(50));
      console.log('FFMPEG NOT FOUND');
      console.log('='.repeat(50));
      console.log('\nPlease compress the audio file manually:');
      console.log('1. Use online tools like: https://www.freeconvert.com/audio-compressor');
      console.log('2. Target size: under 10MB');
      console.log('3. Replace public/music.mp3 with the compressed version');
      console.log('4. Run this script again\n');
      console.log('Or install ffmpeg:');
      console.log('- Windows: choco install ffmpeg');
      console.log('- Mac: brew install ffmpeg');
      console.log('- Linux: sudo apt install ffmpeg\n');
    } else {
      console.error('Error:', error.message);
    }
  }
}

main();
