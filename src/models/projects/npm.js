import path from 'path';
import { log } from 'utils/logger';

let project = {};
let packageJSONPath = path.join(process.cwd(), 'package.json');

try {
  project = require(packageJSONPath);
} catch (e) {
  log.error(
    `No package.json found in the command directory. Looking for ${packageJSONPath}`
  );
  process.exit(0);
}

export { project };
