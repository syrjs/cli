// @todo, get locale translated, and introduce selection
let _values = require(`${__dirname}/en_US.json`);

module.exports = {
  get: (key) => {
    return _values[key] || '';
  }
};