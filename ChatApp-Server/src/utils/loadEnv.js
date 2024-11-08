const fs = require("fs");
const path = require("path");
let curDirectory = __dirname;
let currentFolderName = path.basename(curDirectory);
const root = path.parse(curDirectory).root;

while (currentFolderName != "ChatApp-Server" && curDirectory !== root) {
  curDirectory = path.join(curDirectory, "..");
  currentFolderName = path.basename(curDirectory);
}

const loadEnv = function () {
  if (curDirectory === root) {
    console.log("No src exists");
    return;
  }
    // const envFilePath = curDirectory + '\\' + '.env';// will give error in unix like systems
    const envFilePath = path.join(curDirectory, '.env');

  if (fs.existsSync(envFilePath)) {
    const envFileContent = fs.readFileSync(envFilePath,'utf-8');
    envFileContent.split('\n').forEach(line => {
        const [key,value] = line.split('=');
        
        if(key && value)
        {
            process.env[key.trim()] = value.trim().replace(/^['"]+|['"]+$/g,'');
        }
    });

  } else {
    console.log("env file not found");
  }
};

module.exports = loadEnv;
