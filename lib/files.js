const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const isTypescript = (componentExt) => {
  return componentExt === 'ts' || componentExt === 'tsx'
};

module.exports = {
  getCurrentDirectoryBase : () => {
    return path.basename(process.cwd());
  },

  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  isTypescript: (ext) => {
    return isTypescript(ext)
  },

  buildExtension: (ext) => {
    return isTypescript(ext) ? 'ts' : 'js'
  },

  canCreateTypeFile: (ext) => {
    return isTypescript(ext)
  },

  createFile: (fullPath, template) => {
    // Create folders
    shell.mkdir('-p', perform.distPath);

    // Create file
    fs.writeFile(fullPath, template, (err) => {
      if (err) throw err;
      // console.log('File is created successfully.');
    });
  }
};
