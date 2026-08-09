const fs = require('fs');
const path = require('path');

const mappings = {
  "/devis/IMG_7358.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268711/devis-gym/devis/IMG_7358.JPG.jpg",
  "/devis/IMG_7359.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268712/devis-gym/devis/IMG_7359.JPG.jpg",
  "/devis/IMG_7360.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268714/devis-gym/devis/IMG_7360.JPG.jpg",
  "/devis/IMG_7361.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268716/devis-gym/devis/IMG_7361.JPG.jpg",
  "/devis/IMG_7362.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268718/devis-gym/devis/IMG_7362.JPG.jpg",
  "/devis/IMG_7363.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268720/devis-gym/devis/IMG_7363.JPG.jpg",
  "/devis/IMG_7364.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268722/devis-gym/devis/IMG_7364.JPG.jpg",
  "/devis/IMG_7365.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268724/devis-gym/devis/IMG_7365.JPG.jpg",
  "/devis/IMG_7366.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268726/devis-gym/devis/IMG_7366.JPG.jpg",
  "/devis/IMG_7367.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268728/devis-gym/devis/IMG_7367.JPG.jpg",
  "/devis/IMG_7368.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268729/devis-gym/devis/IMG_7368.JPG.jpg",
  "/devis/IMG_7369.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268732/devis-gym/devis/IMG_7369.JPG.jpg",
  "/devis/IMG_7370.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268734/devis-gym/devis/IMG_7370.JPG.jpg",
  "/devis/IMG_7371.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268735/devis-gym/devis/IMG_7371.JPG.jpg",
  "/devis/IMG_7372.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268737/devis-gym/devis/IMG_7372.JPG.jpg",
  "/devis/IMG_7373.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268739/devis-gym/devis/IMG_7373.JPG.jpg",
  "/devis/IMG_7374.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268742/devis-gym/devis/IMG_7374.JPG.jpg",
  "/devis/IMG_7375.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268743/devis-gym/devis/IMG_7375.JPG.jpg",
  "/devis/IMG_7376.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268745/devis-gym/devis/IMG_7376.JPG.jpg",
  "/devis/IMG_7377.JPG.jpeg": "https://res.cloudinary.com/ufiebboc/image/upload/v1786268747/devis-gym/devis/IMG_7377.JPG.jpg"
};

const galleryFilePath = path.join(__dirname, '..', 'data', 'gallery.ts');

console.log('Fixing gallery.ts URLs...\n');

let content = fs.readFileSync(galleryFilePath, 'utf-8');
let replacements = 0;

Object.entries(mappings).forEach(([oldPath, newUrl]) => {
  const regex = new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = (content.match(regex) || []).length;
  
  if (matches > 0) {
    content = content.replace(regex, newUrl);
    console.log(`✓ Replaced ${matches}x: ${oldPath}`);
    replacements += matches;
  }
});

fs.writeFileSync(galleryFilePath, content, 'utf-8');

console.log('\n' + '='.repeat(50));
console.log(`✓ Complete! ${replacements} URLs replaced`);
console.log('='.repeat(50));
