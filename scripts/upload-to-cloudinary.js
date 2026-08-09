const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Parse CLOUDINARY_URL: cloudinary://api_key:api_secret@cloud_name
// cloudinary://737261635528765:FgF_Hog6T5oP_SImydd0u_MnV90@ufiebboc
cloudinary.config({
  cloud_name: 'ufiebboc',
  api_key: '737261635528765',
  api_secret: 'FgF_Hog6T5oP_SImydd0u_MnV90',
  secure: true
});

const publicDir = path.join(__dirname, '..', 'public');
const uploadedFiles = [];
const urlMappings = {};

// File extensions to upload
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
const videoExtensions = ['.mp4', '.webm'];
const audioExtensions = ['.mp3'];
const allExtensions = [...imageExtensions, ...videoExtensions, ...audioExtensions];

// Get all files recursively
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip fonts directory
      if (file !== 'fonts') {
        getAllFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (allExtensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Upload file to Cloudinary
async function uploadFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const relativePath = path.relative(publicDir, filePath);
  const pathParts = relativePath.split(path.sep);
  
  // Create folder structure in Cloudinary
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
    console.log(`Uploading: ${relativePath}...`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: resourceType,
      use_filename: true,
      unique_filename: false,
      overwrite: true
    });
    
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
  console.log('Starting Cloudinary upload...\n');
  console.log('Cloud Name:', 'ufiebboc');
  console.log('Public Directory:', publicDir);
  console.log('-----------------------------------\n');
  
  const files = getAllFiles(publicDir);
  console.log(`Found ${files.length} files to upload\n`);
  
  // Upload files with rate limiting (5 at a time)
  const batchSize = 5;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(uploadFile));
    uploadedFiles.push(...results);
    
    // Small delay between batches
    if (i + batchSize < files.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Generate mapping file
  const mappingPath = path.join(__dirname, 'cloudinary-mappings.json');
  fs.writeFileSync(mappingPath, JSON.stringify(urlMappings, null, 2));
  
  // Summary
  const successful = uploadedFiles.filter(f => f.success).length;
  const failed = uploadedFiles.filter(f => !f.success).length;
  
  console.log('\n===================================');
  console.log('UPLOAD SUMMARY');
  console.log('===================================');
  console.log(`Total files: ${files.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  console.log(`\nURL mappings saved to: ${mappingPath}`);
  
  if (failed > 0) {
    console.log('\nFailed uploads:');
    uploadedFiles.filter(f => !f.success).forEach(f => {
      console.log(`  - ${f.path}: ${f.error}`);
    });
  }
}

main().catch(console.error);
