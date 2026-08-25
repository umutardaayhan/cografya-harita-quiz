const fs = require('fs');
const path = require('path');

// 1. Load the generated links mapping
const mappingFile = path.join(__dirname, 'entity_links.json');
if (!fs.existsSync(mappingFile)) {
  console.error('entity_links.json not found!');
  process.exit(1);
}
const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
console.log('Loaded mappings count:', Object.keys(mapping).length);

const targetFiles = [
  path.join(__dirname, '..', 'data', 'cografya_data.legacy.js'),
  path.join(__dirname, '..', 'data', 'source', '10_toprak_afet_fay.js'),
  path.join(__dirname, '..', 'data', 'source', '20_maden_enerji.js'),
  path.join(__dirname, '..', 'data', 'source', '30_nufus_yerlesme.js'),
  path.join(__dirname, '..', 'data', 'source', '40_bolgeler.js'),
  path.join(__dirname, '..', 'data', 'source', '50_kiyilar.js'),
  path.join(__dirname, '..', 'data', 'source', '60_dis_kuvvetler.js'),
  path.join(__dirname, '..', 'data', 'source', '70_turizm.js'),
  path.join(__dirname, '..', 'data', 'source', '80_ulasim.js')
];

let totalModified = 0;

targetFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let fileModCount = 0;

  Object.entries(mapping).forEach(([itemId, groupId]) => {
    // Regex to match item object with id: 'itemId' or id: "itemId"
    // and inject groupId if not already having the exact groupId
    const idRegex = new RegExp(`(id:\\s*['"]${itemId}['"][\\s\\S]*?)(kpssNot:|region:|city:|type:|shapeType:|points:|lat:|\\n\\s*\\})`, 'g');
    
    // Check if the item exists in this file
    if (content.includes(`'${itemId}'`) || content.includes(`"${itemId}"`)) {
      // Check if item already has this groupId
      const itemBlockRegex = new RegExp(`\\{[^\\{]*?id:\\s*['"]${itemId}['"][^\\}]*?\\}`, 'g');
      content = content.replace(itemBlockRegex, (block) => {
        if (block.includes(`groupId: '${groupId}'`) || block.includes(`groupId: "${groupId}"`)) {
          return block; // already has correct groupId
        }
        if (/groupId:\s*['"][^'"]*['"]/.test(block)) {
          // Replace existing groupId
          fileModCount++;
          return block.replace(/groupId:\s*['"][^'"]*['"]/, `groupId: '${groupId}'`);
        } else {
          // Insert groupId after id line
          fileModCount++;
          return block.replace(/(id:\s*['"][^'"]+['"],?)/, `$1\n    groupId: '${groupId}',`);
        }
      });
    }
  });

  if (fileModCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${fileModCount} items in ${path.basename(filePath)}`);
    totalModified += fileModCount;
  }
});

console.log('Total items modified with cross-pack groupIds:', totalModified);
