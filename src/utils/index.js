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

function shouldExclude(base, excludes) {
  //check excludes
  let bShouldExclude = false;
  excludes &&
    excludes.forEach(exclude => {
      bShouldExclude = base.indexOf(exclude) > -1 ? true : false;
    });
  return bShouldExclude;
}

function recursiveDirectoriesByName(base, name, excludes) {
  let ret = [];

  // check to see if this is a directory before we dive into it
  let stats = fs.lstatSync(base);

  if (stats.isSymbolicLink()) {
    base = fs.realpathSync(base);
    stats = fs.lstatSync(base);
  }

  if (!stats.isDirectory() || base.indexOf('DerivedData') > -1) {
    return ret;
  }

  // then get it's sub directories or files that match our pattern
  let dirs = getDirs(base);
  dirs.forEach(dir => {
    if (dir.indexOf(name) > -1) {
      ret.push({
        name: dir,
        value: path.join(base, dir)
      });
    } else {
      if (!shouldExclude(path.join(base, dir), excludes)) {
        let subdirs = recursiveDirectoriesByName(
          path.join(base, dir),
          name,
          excludes
        );
        ret = ret.concat(subdirs);
      }
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
