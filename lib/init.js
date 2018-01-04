const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');

const initInstallCommand = `npm install`;

module.exports = function(projName) {
  console.log('🔨  Creating Project');
  let root = path.resolve(projName);
    let projectName = path.basename(root);
    if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
      process.chdir(root);
      const packageJson = {
        name: projectName,
        version: '1.0.0',
        private: true,
        scripts: {
          "serve": "webpack-dev-server --config webpack.config.js --content-base build/"
        },
        "devDependencies": {
          "syr": "latest",
          "babel-core": "^6.26.0",
          "babel-loader": "^7.1.2",
          "babel-preset-env": "^1.6.1",
          "babel-plugin-syntax-jsx": "latest",
          "html-webpack-plugin": "^2.29.0",
          "html-webpack-template": "^6.0.1",
          "file-loader": "^1.1.5",
          "json-loader": "^0.5.4",
          "uglifyjs-webpack-plugin": "^0.4.6",
          "webpack": "^3.1.0",
          "webpack-dev-server": "^2.4.5"
        }
      };
      const bableConfig = () =>{
        return {
        presets: ['env'],
        plugins: [[path.join(root,'/node_modules/syr/libs/jsx.js'), { useVariables: true }]]
      }};
      fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson));
      process.chdir(root);
      execSync(initInstallCommand, {stdio: 'inherit'});

      console.log('\n');

      // make src directory in project root
      var srcDir = path.join(root, 'src');
      if (!fs.existsSync(srcDir)){
          fs.mkdirSync(srcDir);
      }

      // copy over iOS project
      copyDir(path.join(root,'/node_modules/syr/ios/SyrNativeSample'), path.join(root, 'ios'));

      // modify pathing of iOS project, to point to node_modules for SyrNative library
      // SyrNativeSample.xcodeproj
      const iosProject = path.join(root,'/ios/SyrNativeSample.xcodeproj/project.pbxproj');

      if (fs.existsSync(iosProject)){
        fs.readFile(iosProject, 'utf8', function (err, data) {
            let lines = data.split('\n');

            // change the path of SyrNative to the node_modules location
            processLines(lines, function(line, lineNumber) {
              lines[lineNumber] = line.replace('../SyrNative/SyrNative.xcodeproj',path.join(root,'/node_modules/syr/ios/SyrNative/SyrNative.xcodeproj'));
            });

            fs.writeFile(iosProject, lines.join("\n"), (err) => {
              if (err) throw err;
            });

            // move boilerplate
            fs.writeFileSync(path.join(srcDir, 'index.js'), fs.readFileSync(path.join(__dirname,'../fixtures/index.js')));
            fs.writeFileSync(path.join(root, 'webpack.config.js'), fs.readFileSync(path.join(__dirname, '../configs/webpack.config.js')));
            fs.writeFileSync(path.join(root, '.bablerc'), JSON.stringify(bableConfig()));

            console.log('🏁  Finished!')
        });
      }


    } else {
      //@TODO
    }
};

function processLines(lines, cb) {
  for(let i = 0; i < lines.length; i++) {
    cb(lines[i], i);
  }
}

var mkdir = function(dir) {
	// making directory without exception if exists
	try {
		fs.mkdirSync(dir, 0755);
	} catch(e) {
		if(e.code != "EEXIST") {
			throw e;
		}
	}
};

var copyDir = function(src, dest) {
	mkdir(dest);
	var files = fs.readdirSync(src);
	for(var i = 0; i < files.length; i++) {
		var current = fs.lstatSync(path.join(src, files[i]));
		if(current.isDirectory()) {
			copyDir(path.join(src, files[i]), path.join(dest, files[i]));
		} else if(current.isSymbolicLink()) {
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