/**
 * This module helps log stuff :D
 */

import chalk from 'chalk';
import cTable from 'console.table';

function log(message, level) {
  switch (level) {
    case 'warn':
      message = chalk.yellow(message);
      break;
    case 'error':
      message = chalk.red(message);
      break;
    case 'info':
      message = chalk.white(message);
      break;
    case 'success':
      message = chalk.green(message);
      break;
    default:
      message = message;
  }
  console.log(message);
}

log.error = message => {
  log(message, 'error');
};

log.warn = message => {
  log(message, 'warn');
};

log.info = message => {
  log(message, 'info');
};

log.success = message => {
  log(message, 'success');
};

log.table = function() {
  console.table.apply(0, arguments);
};

log.chalk = chalk;

export { log };
