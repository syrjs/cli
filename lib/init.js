const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');

const initInstallCommand = `npm install --save --save-dev syr && npm install babel-plugin-transform-jsx --save-dev && npm install`;

module.exports = function(projName) {
  console.log('creating project');
  let root = path.resolve(projName);
    let projectName = path.basename(root);
    if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
      process.chdir(root);
      const packageJson = {
        name: projectName,
        version: '0.0.1',
        private: true,
        scripts: {
          "serve": "webpack-dev-server --config dev.config.js --content-base build/"
        },
        "devDependencies": {
        "babel-core": "^6.24.1",
        "babel-loader": "^7.0.0",
        "babel-plugin-transform-jsx": "^2.0.0",
        "babel-preset-es2015": "^6.24.1",
        "coveralls": "^2.13.1",
        "html-webpack-plugin": "^2.29.0",
        "html-webpack-template": "^6.0.1",
        "json-loader": "^0.5.4",
        "mocha": "^3.4.2",
        "mocha-coveralls-reporter": "0.0.5",
        "mocha-lcov-reporter": "^1.3.0",
        "nyc": "^11.1.0",
        "prettier": "^1.5.3",
        "styled-jsx": "^1.0.10",
        "travis-cov": "^0.2.5",
        "uglifyjs-webpack-plugin": "^0.4.6",
        "webpack": "^3.1.0",
        "webpack-dev-server": "^2.4.5"
      }
      };
      const bableConfig = {
        "presets": ["babel-preset-es2015"],
        "plugins": [["babel-plugin-transform-jsx", { "useVariables": true }]]
      }
      fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson));
      process.chdir(root);
      execSync(initInstallCommand, {stdio: 'inherit'});
      fs.writeFileSync(path.join(root, 'index.js'), fs.readFileSync(path.join(root,'/node_modules/syr/samples/example.js')));
      fs.writeFileSync(path.join(root, 'dev.config.js'), fs.readFileSync(path.join(root,'/node_modules/syr/dev.config.js')));
      fs.writeFileSync(path.join(root, '.bablerc'), JSON.stringify(bableConfig));
      process.exit(1);
    } else {
      //@TODO
    }
};
