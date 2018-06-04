import fs from 'fs';

function read(filePath) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    write();
  }
  return data;
}

function write(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

export { read, write };
