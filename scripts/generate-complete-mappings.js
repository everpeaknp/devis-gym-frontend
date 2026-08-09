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

const mappings = {};

// Fetch all resources recursively
async function fetchAllResources(resourceType = 'image', nextCursor = null) {
  try {
    const options = {
      type: 'upload',
      prefix: 'devis-gym/',
      max_results: 500,
      resource_type: resourceType
    };
    
    if (nextCursor) {
      options.next_cursor = nextCursor;
    }
    
    const result = await cloudinary.api.resources(options);
    
    result.resources.forEach(resource => {
      // Extract the relative path from the public_id
      // Example: devis-gym/people/DSC07385.JPG -> /people/DSC07385.JPG
      const publicId = resource.public_id;
      const relativePath = publicId.replace('devis-gym/', '/');
      
      // Handle file extension changes (e.g., .jpg -> .webp)
      // Try to match with original extension
      const ext = path.extname(relativePath);
      const basePath = relativePath.substring(0, relativePath.length - ext.length);
      
      // Store both the exact match and possible original extensions
      mappings[relativePath] = resource.secure_url;
      
      // Also store common variations
      if (ext === '.webp') {
        mappings[basePath + '.jpg'] = resource.secure_url;
        mappings[basePath + '.JPG'] = resource.secure_url;
        mappings[basePath + '.jpeg'] = resource.secure_url;
        mappings[basePath + '.JPEG'] = resource.secure_url;
        mappings[basePath + '.png'] = resource.secure_url;
        mappings[basePath + '.PNG'] = resource.secure_url;
      }
    });
    
    console.log(`Fetched ${result.resources.length} ${resourceType} resources (total so far: ${Object.keys(mappings).length})`);
    
    // If there's a next cursor, fetch more
    if (result.next_cursor) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
      await fetchAllResources(resourceType, result.next_cursor);
    }
  } catch (error) {
    console.error(`Error fetching ${resourceType} resources:`, error.message);
  }
}

async function main() {
  console.log('Generating complete Cloudinary mappings...\n');
  
  // Fetch all resource types
  await fetchAllResources('image');
  await fetchAllResources('video');
  await fetchAllResources('raw');
  
  // Save to file
  const mappingPath = path.join(__dirname, 'cloudinary-mappings.json');
  fs.writeFileSync(mappingPath, JSON.stringify(mappings, null, 2));
  
  console.log(`\n✓ Complete! Generated ${Object.keys(mappings).length} URL mappings`);
  console.log(`  Saved to: ${mappingPath}`);
}

main().catch(console.error);
