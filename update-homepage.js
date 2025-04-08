const fs = require('fs');
const path = require('path');
require('dotenv').config();

const basename = process.env.REACT_APP_BASENAME;
const packageJson = require('./package.json');

packageJson.homepage = basename;

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));