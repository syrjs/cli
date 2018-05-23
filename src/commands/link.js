import fs from 'fs';
import path from 'path';

const api = {
  link: () => {},
  unlink: () => {}
};

function cmd(parameters, switches) {
  console.log('link command');
}

export { cmd, api };
