const fs = require('fs');
const { exec, execSync } = require('child_process');

const watchCommand = `npm run serve`;

module.exports = function() {
  console.log('starting watch server');
  if(fs.existsSync('package.json')) {
        execSync(watchCommand, {stdio: 'inherit'});
      } else {
        //@TODO
      }
};
