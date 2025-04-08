const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
require('dotenv').config();

const basename = process.env.REACT_APP_BASENAME;

const output = fs.createWriteStream(`${basename}.zip`);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Zip file created: ${basename}.zip`);
});

archive.pipe(output);
archive.directory(basename, false);
archive.finalize();