const fs = require('fs');
const path = require('path');
require('dotenv').config();

const basename = process.env.REACT_APP_BASENAME;

fs.renameSync('build', basename);