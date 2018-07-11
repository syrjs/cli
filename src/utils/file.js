import fs from 'fs';
import path from 'path';

function read(filePath) {
  let data = {};
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    write(filePath, data);
  }
  return data;
}

function write(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

export { read, write };
