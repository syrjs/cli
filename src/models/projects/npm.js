import path from 'path';

let info = {};
let packageJSONPath = path.join(process.cwd(), 'package.json');

try {
  info = require(packageJSONPath);
} catch (e) {
  log.error(
    `No package.json found in the command directory. ${packageJSONPath}`
  );
}

export {
  info
};