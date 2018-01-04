const fs = require('fs');
const path = require('path');


/**
 * Linking Function that is Exported
 */
module.exports = function () {

  console.log('🤸‍♀️  Linking Projects');
  let files = listFilesFromDir(global.cwd, '.pbxproj');
  if (files.length > 0) {
    processFiles(files);
  } else {
    console.log('🚫 No iOS Projects Found')
  }
};

/**
 * Process a list of file paths
 * @param {string} fileList
 */
function processFiles(fileList) {
  for (let i = 0; i < fileList.length; i++) {
    let filePath = fileList[i];
    processFile(filePath);
  }
}

/**
 * Update links in a file
 * @param {string} filePath
 */
function processFile(filePath) {

  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', function (err, data) {
      let lines = data.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].indexOf('path') > -1 && lines[i].indexOf('node_modules') > -1) {
          processSegments(lines[i], (newPath, oldPath)=>{

            // xcode links projects from the folder root of the xcodeproj, remove
            // both xcodeproj and pbxproj from the path
            let folderPath = filePath.split('/');
            folderPath.splice(-2);
            let relativePath = path.relative(folderPath.join('/'), newPath);
            lines[i] = lines[i].replace(oldPath, relativePath);
            console.log('🔗  Linking - ', relativePath);
          });
        }
      }

      // write back out the project file
      fs.writeFile(filePath, lines.join("\n"), (err) => {
        if (err) throw err;
      });
    });
  }
}

/**
 * remap any libraries pointing to node_modules, to the local node_modules.
 * use relative pathing, so these are unlikely to need to change through
 * git commits, after being run the first time.
 * @param {string} line
 */
function processSegments(line, cb) {
  let segments = line.split(';');
  for (let i = 0; i < segments.length; i++) {
    let parts = segments[i].split('=');
    if(parts[0].indexOf('path') > -1) {
      //change the path
      let currentPath = parts[1].split('node_modules');
      let newPath = process.cwd() + '/node_modules' + currentPath[1];
      cb(newPath, parts[1]);
    }
  }
}

/**
 * Get list of files from directory path
 * @param {string} startPath
 * @param {string} filter
 */
function listFilesFromDir(startPath, filter) {
  let retFiles = [];

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      retFiles = retFiles.concat(listFilesFromDir(filename, filter)); //recurse
    } else if (filename.indexOf(filter) >= 0 && filename.indexOf('node_modules') == -1) {
      retFiles.push(filename);
      console.log('🔬  ', filename.replace('/project.pbxproj',''));
    };
  };

  return retFiles;
};