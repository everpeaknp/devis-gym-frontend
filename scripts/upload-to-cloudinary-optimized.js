const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'ufiebboc',
  api_key: '737261635528765',
  api_secret: 'FgF_Hog6T5oP_SImydd0u_MnV90',
  secure: true
});

const publicDir = path.join(__dirname, '..', 'public');
const tempDir = path.join(os.tmpdir(), 'cloudinary-upload');
const uploadedFiles = [];
const urlMappings = {};

// Ensure temp directory exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// File extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const svgExtension = '.svg';
const videoExtensions = ['.mp4', '.webm'];
const audioExtensions = ['.mp3'];

// 10MB limit for free tier
const MAX_SIZE = 10 * 1024 * 1024;

// Get all files recursively
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (file !== 'fonts') {
        getAllFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if ([...imageExtensions, svgExtension, ...videoExtensions, ...audioExtensions].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Optimize image if needed
async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const size = fs.statSync(filePath).size;
  
  // SVG files - don't optimize, just return original
  if (ext === svgExtension) {
    return filePath;
  }
  
  // If file is under limit and already webp, use original
  if (size < MAX_SIZE && ext === '.webp') {
    return filePath;
  }
  
  // If file is under limit but not webp, convert to webp
  if (size < MAX_SIZE && imageExtensions.includes(ext)) {
    const tempFile = path.join(tempDir, `${path.basename(filePath, ext)}.webp`);
    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(tempFile);
    
    const newSize = fs.statSync(tempFile).size;
    if (newSize < size) {
      console.log(`  Converted to WebP: ${(size / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB`);
      return tempFile;
    }
    fs.unlinkSync(tempFile);
    return filePath;
  }
  
  // If file is over limit, resize and optimize
  if (size >= MAX_SIZE && imageExtensions.includes(ext)) {
    const tempFile = path.join(tempDir, `${path.basename(filePath, ext)}.webp`);
    let quality = 80;
    let resized = false;
    
    // First try with quality reduction
    await sharp(filePath)
      .webp({ quality })
      .toFile(tempFile);
    
    let newSize = fs.statSync(tempFile).size;
    
    // If still too large, resize dimensions
    if (newSize >= MAX_SIZE) {
      const metadata = await sharp(filePath).metadata();
      const maxDimension = 1920;
      
      if (metadata.width > maxDimension || metadata.height > maxDimension) {
        await sharp(filePath)
          .resize(maxDimension, maxDimension, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(tempFile);
        
        newSize = fs.statSync(tempFile).size;
        resized = true;
      }
    }
    
    // If STILL too large, reduce quality more
    while (newSize >= MAX_SIZE && quality > 50) {
      quality -= 10;
      const metadata = await sharp(filePath).metadata();
      
      await sharp(filePath)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality })
        .toFile(tempFile);
      
      newSize = fs.statSync(tempFile).size;
    }
    
    console.log(`  Optimized: ${(size / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB${resized ? ' (resized)' : ''}`);
    return tempFile;
  }
  
  return filePath;
}

// Upload file to Cloudinary
async function uploadFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const relativePath = path.relative(publicDir, filePath);
  const pathParts = relativePath.split(path.sep);
  
  // Create folder structure
  const folder = pathParts.length > 1 
    ? `devis-gym/${pathParts.slice(0, -1).join('/')}`
    : 'devis-gym';
  
  // Determine resource type
  let resourceType = 'image';
  if (videoExtensions.includes(ext)) {
    resourceType = 'video';
  } else if (audioExtensions.includes(ext)) {
    resourceType = 'raw';
  }
  
  try {
    const fileSize = fs.statSync(filePath).size;
    console.log(`Uploading: ${relativePath} (${(fileSize / 1024 / 1024).toFixed(2)}MB)...`);
    
    let uploadPath = filePath;
    let wasOptimized = false;
    
    // Skip large videos and audio files
    if (fileSize >= MAX_SIZE && (resourceType === 'video' || resourceType === 'raw')) {
      console.log(`✗ Skipped: ${relativePath} - File too large for free tier (${(fileSize / 1024 / 1024).toFixed(2)}MB)\n`);
      return { success: false, path: relativePath, error: 'File too large', skipped: true };
    }
    
    // Optimize images if needed
    if (resourceType === 'image' && imageExtensions.includes(ext)) {
      uploadPath = await optimizeImage(filePath);
      wasOptimized = uploadPath !== filePath;
    }
    
    const result = await cloudinary.uploader.upload(uploadPath, {
      folder: folder,
      resource_type: resourceType,
      use_filename: true,
      unique_filename: false,
      overwrite: true
    });
    
    // Clean up temp file
    if (wasOptimized && fs.existsSync(uploadPath)) {
      fs.unlinkSync(uploadPath);
    }
    
    const publicPath = '/' + relativePath.replace(/\\/g, '/');
    urlMappings[publicPath] = result.secure_url;
    
    console.log(`✓ Uploaded: ${relativePath}`);
    console.log(`  URL: ${result.secure_url}\n`);
    
    return { success: true, path: relativePath, url: result.secure_url };
  } catch (error) {
    console.error(`✗ Failed to upload ${relativePath}:`, error.message);
    return { success: false, path: relativePath, error: error.message };
  }
}

// Main function
async function main() {
  console.log('Starting Cloudinary upload with optimization...\n');
  console.log('Cloud Name:', 'ufiebboc');
  console.log('Public Directory:', publicDir);
  console.log('-----------------------------------\n');
  
  const files = getAllFiles(publicDir);
  console.log(`Found ${files.length} files to upload\n`);
  
  // Upload files sequentially to avoid rate limits
  for (const file of files) {
    const result = await uploadFile(file);
    uploadedFiles.push(result);
    
    // Small delay between uploads
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Clean up temp directory
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  
  // Generate mapping file
  const mappingPath = path.join(__dirname, 'cloudinary-mappings.json');
  fs.writeFileSync(mappingPath, JSON.stringify(urlMappings, null, 2));
  
  // Summary
  const successful = uploadedFiles.filter(f => f.success).length;
  const failed = uploadedFiles.filter(f => !f.success && !f.skipped).length;
  const skipped = uploadedFiles.filter(f => f.skipped).length;
  
  console.log('\n===================================');
  console.log('UPLOAD SUMMARY');
  console.log('===================================');
  console.log(`Total files: ${files.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  console.log(`Skipped (too large): ${skipped}`);
  console.log(`\nURL mappings saved to: ${mappingPath}`);
  
  if (failed > 0) {
    console.log('\nFailed uploads:');
    uploadedFiles.filter(f => !f.success && !f.skipped).forEach(f => {
      console.log(`  - ${f.path}: ${f.error}`);
    });
  }
  
  if (skipped > 0) {
    console.log('\nSkipped files (too large for free tier):');
    uploadedFiles.filter(f => f.skipped).forEach(f => {
      console.log(`  - ${f.path}`);
    });
  }
}

main().catch(console.error);
