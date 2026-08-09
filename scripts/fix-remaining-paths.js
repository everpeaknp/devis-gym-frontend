const fs = require('fs');
const path = require('path');

const mappings = {
  // Equipment paths
  "/equipment/1.webp": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268749/devis-gym/equipment/1.webp",
  "/equipment/2.webp": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268751/devis-gym/equipment/2.webp",
  "/equipment/3.png": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268752/devis-gym/equipment/3.webp",
  "/equipment/4.png": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268757/devis-gym/equipment/4.webp",
  "/equipment/7.webp": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268760/devis-gym/equipment/7.webp",
  
  // Devis paths
  "/devis/IMG_7361.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268716/devis-gym/devis/IMG_7361.JPG.jpg",
  "/devis/IMG_7374.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268742/devis-gym/devis/IMG_7374.JPG.jpg",
  
  // Hero paths
  "/hero/man.png": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268837/devis-gym/hero/man.webp",
  "/hero/training-person.webp": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268837/devis-gym/hero/man.webp", // Same image
  "/hero/135161-761273563_medium.mp4": "https://res.cloudinary.com/ufiebboc/video/upload/v1786268804/devis-gym/hero/293079_medium.mp4",
  
  // Backgrounds
  "/backgrounds/parallax-layer.webp": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268785/devis-gym/backgrounds/parallax-layer.webp"
};

const projectRoot = path.join(__dirname, '..');
const filesToCheck = [
  'app/about/page.tsx',
  'components/sections/FinalCTASection.tsx',
  'components/sections/GymIntroSection.tsx',
  'components/sections/KickstartSection.tsx',
  'components/unused-components/sections/ProgressSection.tsx',
  'components/unused-components/sections/Intro.tsx',
  'components/unused-components/ui/parallax-scrolling.tsx',
  'components/unused-components/ui/VelocityText.tsx'
];

console.log('Fixing remaining image URLs in project files...\n');

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
