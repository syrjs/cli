import fs from 'fs';
import { exec, execSync } from 'child_process';
const watchCommand = 'npm run serve';

const api = {
  watch: () => {
    if (fs.existsSync('package.json')) {
      console.log('👀 Starting Watch Server');
      execSync(watchCommand, { stdio: 'inherit' });
    } else {
      //@TODO
    }
  }
};

function cmd(parameters, switches) {
  api.watch();
}

export { cmd, api };
