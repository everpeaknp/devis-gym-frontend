const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'ufiebboc',
  api_key: '737261635528765',
  api_secret: 'FgF_Hog6T5oP_SImydd0u_MnV90',
  secure: true
});

async function fetchEquipmentImages() {
  try {
    console.log('Fetching equipment images from Cloudinary...\n');
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'devis-gym/equipment',
      max_results: 500
    });
    
    console.log(`Found ${result.resources.length} images\n`);
    
    const mappings = {};
    result.resources.forEach(resource => {
      const pathParts = resource.public_id.split('/');
      const folder = pathParts[pathParts.length - 2];
      const filename = pathParts[pathParts.length - 1];
      const extension = resource.format;
      
      if (folder === 'equipment') {
        const originalPath = `/equipment/${filename}.${extension}`;
        mappings[originalPath] = resource.secure_url;
        console.log(`${filename}.${extension} -> ${resource.secure_url}`);
      } else if (folder === 'machines') {
        const originalPath = `/equipment/machines/${filename}.${extension}`;
        mappings[originalPath] = resource.secure_url;
        console.log(`machines/${filename}.${extension} -> ${resource.secure_url}`);
      }
    });
    
    console.log('\n' + '='.repeat(80));
    console.log('MAPPINGS FOR REPLACEMENT:');
    console.log('='.repeat(80));
    console.log(JSON.stringify(mappings, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchEquipmentImages();
