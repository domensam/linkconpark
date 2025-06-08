const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../certificate_canister/src/declarations');
const targetDir = path.join(__dirname, '../src/declarations');

// Ensure target directory exists
fs.ensureDirSync(targetDir);

// Copy declarations
fs.copySync(sourceDir, targetDir, { overwrite: true });

console.log('Declarations copied successfully!'); 