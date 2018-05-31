import fs from 'fs';

function getDirs(rootDir, cb) {
  let files = fs.readdirSync(rootDir);
  let dirs = [];
  for (let index = 0; index < files.length; ++index) {
    let file = files[index];
    if (file[0] !== '.') {
      let filePath = rootDir + '/' + file;
      let stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        dirs.push(file);
      }
    }
  }
  return dirs;
}

export { getDirs };
