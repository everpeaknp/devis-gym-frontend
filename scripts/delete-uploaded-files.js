const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Files and directories to DELETE (uploaded to Cloudinary)
const toDelete = [
  'backgrounds',
  'bg.jpg',
  'classes',
  'click.mp3',
  'devis',
  'equipment',
  'file.svg',
  'frame',
  'globe.svg',
  'hero',
  'icons',
  'logo.png',
  'muscle-joe.svg',
  // 'music.mp3', // Keep - not uploaded (too large)
  'next.svg',
  'people',
  'plate.svg',
  'Testimonials',
  'vercel.svg',
  'wallbg.webp',
  'window.svg'
];

// Files and directories to KEEP
const toKeep = [
  'fonts',
  'music.mp3', // Not uploaded (too large)
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
  '.gitkeep'
];

let deletedCount = 0;
let skippedCount = 0;

function deleteRecursive(itemPath) {
  if (fs.existsSync(itemPath)) {
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Delete directory recursively
      fs.readdirSync(itemPath).forEach(file => {
        deleteRecursive(path.join(itemPath, file));
      });
      fs.rmdirSync(itemPath);
      console.log(`✓ Deleted directory: ${path.relative(publicDir, itemPath)}`);
      deletedCount++;
    } else {
      // Delete file
      fs.unlinkSync(itemPath);
      console.log(`✓ Deleted file: ${path.relative(publicDir, itemPath)}`);
      deletedCount++;
    }
  }
}

console.log('Deleting uploaded files from /public...\n');
console.log('Files to KEEP:');
toKeep.forEach(item => {
  const itemPath = path.join(publicDir, item);
  if (fs.existsSync(itemPath)) {
    console.log(`  ✓ ${item}`);
  }
});

console.log('\nFiles to DELETE:');

toDelete.forEach(item => {
  const itemPath = path.join(publicDir, item);
  
  if (fs.existsSync(itemPath)) {
    deleteRecursive(itemPath);
  } else {
    console.log(`  ⊗ Already deleted: ${item}`);
    skippedCount++;
  }
});

console.log('\n===================================');
console.log('DELETION SUMMARY');
console.log('===================================');
console.log(`Items deleted: ${deletedCount}`);
console.log(`Items skipped: ${skippedCount}`);
console.log(`Items kept: ${toKeep.length}`);
console.log('\n✓ Public folder cleanup complete!');
console.log('\nRemaining in /public:');
fs.readdirSync(publicDir).forEach(item => {
  const itemPath = path.join(publicDir, item);
  const stat = fs.statSync(itemPath);
  const type = stat.isDirectory() ? '[DIR]' : '[FILE]';
  console.log(`  ${type} ${item}`);
});
