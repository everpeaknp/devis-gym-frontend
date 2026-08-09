const fs = require('fs');
const path = require('path');

const mappings = require('./cloudinary-mappings.json');
const projectRoot = path.join(__dirname, '..');

// File extensions to process
const extensions = ['.tsx', '.ts', '.jsx', '.js', '.css', '.json'];

// Directories to exclude
const excludeDirs = ['node_modules', '.next', '.git', 'scripts', 'public'];

let filesModified = 0;
let replacementsMade = 0;

// Get all files recursively
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Replace URLs in file
function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let fileReplacements = 0;
  
  // Sort mappings by length (longest first) to avoid partial replacements
  const sortedMappings = Object.entries(mappings).sort((a, b) => b[0].length - a[0].length);
  
  sortedMappings.forEach(([publicPath, cloudinaryUrl]) => {
    // Patterns to match:
    // 1. "/path/to/file.ext"
    // 2. '/path/to/file.ext'
    // 3. /path/to/file.ext (in CSS)
    // 4. src="/path/to/file.ext"
    // 5. href="/path/to/file.ext"
    
    const escapedPath = publicPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Pattern 1 & 2: Quoted paths
    const quotedPattern = new RegExp(`(['"\`])${escapedPath}\\1`, 'g');
    if (quotedPattern.test(content)) {
      content = content.replace(quotedPattern, `$1${cloudinaryUrl}$1`);
      modified = true;
      fileReplacements++;
    }
    
    // Pattern 3: CSS url() without quotes
    const cssPattern = new RegExp(`url\\(${escapedPath}\\)`, 'g');
    if (cssPattern.test(content)) {
      content = content.replace(cssPattern, `url(${cloudinaryUrl})`);
      modified = true;
      fileReplacements++;
    }
    
    // Pattern 4 & 5: Attribute values
    const attrPattern = new RegExp(`(src|href|data-src|data-href)=(['"\`])${escapedPath}\\2`, 'g');
    if (attrPattern.test(content)) {
      content = content.replace(attrPattern, `$1=$2${cloudinaryUrl}$2`);
      modified = true;
      fileReplacements++;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    filesModified++;
    replacementsMade += fileReplacements;
    console.log(`✓ Modified: ${path.relative(projectRoot, filePath)} (${fileReplacements} replacements)`);
  }
}

// Main function
function main() {
  console.log('Replacing public URLs with Cloudinary URLs...\n');
  console.log(`Total mappings: ${Object.keys(mappings).length}\n`);
  
  const files = getAllFiles(projectRoot);
  console.log(`Scanning ${files.length} files...\n`);
  
  files.forEach(replaceInFile);
  
  console.log('\n===================================');
  console.log('REPLACEMENT SUMMARY');
  console.log('===================================');
  console.log(`Files scanned: ${files.length}`);
  console.log(`Files modified: ${filesModified}`);
  console.log(`Total replacements: ${replacementsMade}`);
}

main();
