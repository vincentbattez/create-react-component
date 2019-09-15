const fs = require('fs');
const path = require('path');

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
  }
};
