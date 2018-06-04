import os from 'os';

const SYR_CONFIG_FILE = '.syrrc';
const SYR_CONFIG_PATH = path.join(os.homedir(), SYR_CONFIG_FILE);

let preferences = {

};

function getPreferences() {
  return preferences;
}

function setPreference(key, value) {
  preferences[key] = value;
}

export {
  getPreferences,
  setPreference
}