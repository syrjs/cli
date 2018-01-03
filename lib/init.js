var fs = require('fs');
var path = require('path');
var { exec, execSync } = require('child_process');

var initInstallCommand = 'npm install';

module.exports = function(projName) {
  // echo project creation start
  console.log('🔨 Creating Project');

  var root = path.resolve(projName);
  var projectName = path.basename(root);

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
    process.chdir(root);

    var packageJson = {
      name: projectName,
      version: '1.0.0',
      private: true,
      scripts: {
        serve:
          'webpack-dev-server --config webpack.config.js --content-base build/'
      },
      devDependencies: {
        syr: 'latest',
        'babel-core': '^6.26.0',
        'babel-loader': '^7.1.2',
        'babel-preset-env': '^1.6.1',
        'babel-plugin-syntax-jsx': 'latest',
        'html-webpack-plugin': '^2.29.0',
        'html-webpack-template': '^6.0.1',
        'file-loader': '^1.1.5',
        'json-loader': '^0.5.4',
        'uglifyjs-webpack-plugin': '^0.4.6',
        webpack: '^3.1.0',
        'webpack-dev-server': '^2.4.5'
      }
    };

    var babelConfig = function() {
      return {
        presets: ['env'],
        plugins: [
          [
            path.join(root, '/node_modules/syr/libs/jsx.js'),
            { useVariables: true }
          ]
        ]
      };
    };

    fs.writeFileSync(
      path.join(root, 'package.json'),
      JSON.stringify(packageJson)
    );
    process.chdir(root);
    execSync(initInstallCommand, { stdio: 'inherit' });

    // make src directory in project root
    var srcDir = path.join(root, 'src');

    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir);
    }

    // copy over iOS project
    copyDir(
      path.join(root, '/node_modules/syr/ios/SyrNativeSample'),
      path.join(root, 'ios')
    );

    // modify pathing of iOS project, to point to node_modules for SyrNative library
    // SyrNativeSample.xcodeproj
    var iosProject = path.join(
      root,
      '/ios/SyrNativeSample.xcodeproj/project.pbxproj'
    );

    if (fs.existsSync(iosProject)) {
      fs.readFile(iosProject, 'utf8', function(err, data) {
        if (err) {
          throw new Error(err);
        }

        var lines = data.split('\n');

        // change the path of SyrNative to the node_modules location
        processLines(lines, function(line, lineNumber) {
          lines[lineNumber] = line.replace(
            '../SyrNative/SyrNative.xcodeproj',
            path.join(
              root,
              '/node_modules/syr/ios/SyrNative/SyrNative.xcodeproj'
            )
          );
        });

        fs.writeFile(iosProject, lines.join('\n'), err => {
          if (err) throw err;
        });
      });
    }

    // move boilerplate
    console.log('Moving Boilerplate');
    fs.writeFileSync(
      path.join(srcDir, 'index.js'),
      fs.readFileSync(path.join(__dirname, '../fixtures/index.js'))
    );
    fs.writeFileSync(
      path.join(root, 'webpack.config.js'),
      fs.readFileSync(path.join(__dirname, '../configs/webpack.config.js'))
    );
    fs.writeFileSync(
      path.join(root, '.bablerc'),
      JSON.stringify(babelConfig())
    );
  } else {
    console.log('project already exists in current directory!');
    process.exit(1);
  }
};

function processLines(lines, cb) {
  for (var i = 0; i < lines.length; i++) {
    cb(lines[i], i);
  }
}

var mkdir = function(dir) {
  // making directory without exception if exists
  try {
    fs.mkdirSync(dir, 0755);
  } catch (e) {
    if (e.code != 'EEXIST') {
      throw e;
    }
  }
};

var copyDir = function(src, dest) {
  mkdir(dest);
  var files = fs.readdirSync(src);
  for (var i = 0; i < files.length; i++) {
    var current = fs.lstatSync(path.join(src, files[i]));
    if (current.isDirectory()) {
      copyDir(path.join(src, files[i]), path.join(dest, files[i]));
    } else if (current.isSymbolicLink()) {
      var symlink = fs.readlinkSync(path.join(src, files[i]));
      fs.symlinkSync(symlink, path.join(dest, files[i]));
    } else {
      copy(path.join(src, files[i]), path.join(dest, files[i]));
    }
  }
};

var copy = function(src, dest) {
  fs.writeFileSync(dest, fs.readFileSync(src));
};
