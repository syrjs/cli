import fs from 'fs';
import path from 'path';

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

function recursiveDirectoriesByName(base, name) {
  let dirs = getDirs(base);
  let ret = [];

  dirs.forEach(dir => {
    if (dir.indexOf(name) > -1) {
      ret.push({
        name: dir,
        path: base
      });
    } else {
      let subdirs = recursiveDirectoriesByName(path.join(base, dir), name);
      ret = ret.concat(subdirs);
    }
  });

  return ret;
}

function recursiveFilesByExt(base, ext, files, result) {
  files = files || fs.readdirSync(base);
  result = result || [];

  files.forEach(function(file) {
    var newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      result = recursiveFilesByExt(
        newbase,
        ext,
        fs.readdirSync(newbase),
        result
      );
    } else {
      if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
        result.push(newbase);
      }
    }
  });
  return result;
}

export { getDirs, recursiveFilesByExt, recursiveDirectoriesByName };
