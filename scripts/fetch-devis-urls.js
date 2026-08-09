const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'ufiebboc',
  api_key: '737261635528765',
  api_secret: 'FgF_Hog6T5oP_SImydd0u_MnV90',
  secure: true
});

async function fetchDevisImages() {
  try {
    console.log('Fetching devis images from Cloudinary...\n');
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'devis-gym/devis',
      max_results: 500
    });
    
    console.log(`Found ${result.resources.length} images\n`);
    
    const mappings = {};
    result.resources.forEach(resource => {
      const filename = resource.public_id.split('/').pop();
      const originalPath = `/devis/${filename}.jpeg`;
      mappings[originalPath] = resource.secure_url;
      console.log(`${filename} -> ${resource.secure_url}`);
    });
    
    console.log('\n' + '='.repeat(50));
    console.log('MAPPINGS OBJECT:');
    console.log('='.repeat(50));
    console.log(JSON.stringify(mappings, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchDevisImages();
