const fs = require('fs');
const { exec, execSync } = require('child_process');

const watchCommand = `npm run serve`;

module.exports = function() {
  if(fs.existsSync('package.json')) {
        console.log('👀 Starting Watch Server');
        execSync(watchCommand, {stdio: 'inherit'});
      } else {
        //@TODO
      }
};
