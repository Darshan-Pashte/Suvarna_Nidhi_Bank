const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();
const packageJson = require("./package.json");



const readmeContent = `
# ${packageJson.name}

- **Version:** ${packageJson.version}
`;

fs.writeFileSync("description.txt", readmeContent.trim());
