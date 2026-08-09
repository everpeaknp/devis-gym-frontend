const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'ufiebboc',
  api_key: '737261635528765',
  api_secret: 'FgF_Hog6T5oP_SImydd0u_MnV90',
  secure: true
});

const musicPath = path.join(__dirname, '..', 'public', 'music.mp3');

async function uploadMusic() {
  try {
    const fileSize = fs.statSync(musicPath).size;
    console.log(`Uploading music.mp3 (${(fileSize / 1024 / 1024).toFixed(2)}MB)...`);
    console.log('Note: This exceeds the 10MB free tier limit, but attempting upload...\n');
    
    const result = await cloudinary.uploader.upload(musicPath, {
      folder: 'devis-gym',
      resource_type: 'raw',
      use_filename: true,
      unique_filename: false,
      overwrite: true
    });
    
    console.log('✓ Upload successful!');
    console.log(`URL: ${result.secure_url}`);
    console.log(`\nUpdate this URL in your code:`);
    console.log(`Old: /music.mp3`);
    console.log(`New: ${result.secure_url}`);
    
    return result.secure_url;
  } catch (error) {
    console.error('✗ Upload failed:', error.message);
    if (error.http_code === 400 && error.message.includes('File size too large')) {
      console.log('\nThe file exceeds your Cloudinary plan limits.');
      console.log('Options:');
      console.log('1. Upgrade your Cloudinary plan');
      console.log('2. Compress the audio file');
      console.log('3. Host it elsewhere (AWS S3, etc.)');
    }
    throw error;
  }
}

uploadMusic().catch(console.error);
