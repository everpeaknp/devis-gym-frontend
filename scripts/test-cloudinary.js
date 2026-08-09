const cloudinary = require('cloudinary').v2;

// Cloudinary URL format: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
// From your input: cloudinary://FgF_Hog6T5oP_SImydd0u_MnV90:737261635528765@ufiebboc
// API keys are typically numbers, so:
// API_KEY = 737261635528765 (numeric)
// API_SECRET = FgF_Hog6T5oP_SImydd0u_MnV90 (alphanumeric)
// CLOUD_NAME = ufiebboc

cloudinary.config({
  cloud_name: 'ufiebboc',
  api_key: '737261635528765',
  api_secret: 'FgF_Hog6T5oP_SImydd0u_MnV90',
  secure: true
});

async function test() {
  try {
    console.log('Testing Cloudinary connection...');
    console.log('Config:', {
      cloud_name: cloudinary.config().cloud_name,
      api_key: cloudinary.config().api_key
    });
    
    // Test by getting account details
    const result = await cloudinary.api.ping();
    console.log('✓ Connection successful!', result);
    
    // Test upload with a small file
    const testResult = await cloudinary.uploader.upload('./public/logo.png', {
      folder: 'devis-gym/test',
      resource_type: 'image'
    });
    console.log('✓ Test upload successful!', testResult.secure_url);
    
  } catch (error) {
    console.error('✗ Connection failed:', error.message);
    if (error.error && error.error.message) {
      console.error('  Details:', error.error.message);
    }
  }
}

test();
