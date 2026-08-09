const fs = require('fs');
const path = require('path');

// Mappings from the original upload - these were converted to webp
const mappings = {
  // Original .png files were converted to .webp
  "/equipment/machines/1.png": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268764/devis-gym/equipment/machines/1.webp",
  "/equipment/machines/2.png": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268768/devis-gym/equipment/machines/2.webp",
  "/equipment/machines/3.webp": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268770/devis-gym/equipment/machines/3.webp",
  "/equipment/machines/4.webp": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268771/devis-gym/equipment/machines/4.webp",
  "/equipment/machines/5.png": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268775/devis-gym/equipment/machines/5.webp",
  "/equipment/machines/6.png": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268777/devis-gym/equipment/machines/6.webp",
  
  // Main equipment images
  "/equipment/main.jpg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268779/devis-gym/equipment/main.webp",
  "/equipment/1.webp": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268749/devis-gym/equipment/1.webp",
  "/equipment/2.webp": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268751/devis-gym/equipment/2.webp",
  "/equipment/3.png": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268752/devis-gym/equipment/3.webp",
  "/equipment/4.jpg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268757/devis-gym/equipment/4.webp",
  "/equipment/6.webp": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268758/devis-gym/equipment/6.webp",
  "/equipment/7.webp": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268760/devis-gym/equipment/7.webp",
  "/equipment/9.png": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268763/devis-gym/equipment/9.webp",
  "/equipment/plate.png": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268781/devis-gym/equipment/plate.webp"
};

const projectRoot = path.join(__dirname, '..');
const filesToCheck = [
  'app/gym/page.tsx',
  'app/page.tsx'
];

console.log('Fixing equipment URLs in project files...\n');

let totalReplacements = 0;

filesToCheck.forEach(file => {
  const filePath = path.join(projectRoot, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⊗ File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let fileReplacements = 0;
  
  Object.entries(mappings).forEach(([oldPath, newUrl]) => {
    const regex = new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = (content.match(regex) || []).length;
    
    if (matches > 0) {
      content = content.replace(regex, newUrl);
      console.log(`✓ ${file}: Replaced ${matches}x ${oldPath}`);
      fileReplacements += matches;
    }
  });
  
  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  → Total replacements in ${file}: ${fileReplacements}\n`);
    totalReplacements += fileReplacements;
  } else {
    console.log(`  No replacements needed in ${file}\n`);
  }
});

console.log('='.repeat(50));
console.log(`✓ Complete! ${totalReplacements} URLs replaced across all files`);
console.log('='.repeat(50));
