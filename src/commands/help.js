import { log } from 'utils/logger';
import fs from 'fs';
import path from 'path';
import localeStrings from 'strings';

import projectPackage from '../../package.json';

const description = {
  short: localeStrings.get('Displays this menu'),
  usage: 'syr help'
};

const api = {
  help: () => {
    log.info('');
    log.info(`${log.chalk.yellow('Syr CLI')}: ${projectPackage.version}`);
    log.info('');
    log.table(getCommands());
    log.info('');
    log.info(
      `${localeStrings.get('Need Help?')} -> https://www.github.com/syrjs/cli`
    );
    log.info('');
  },
  commandDetail: commandName => {
    // const commandPath = path.join(__dirname, commandName);
    // const { description } = require(commandPath);
    log.warn('Not implimented');
  }
};

function cmd(parameters, switches) {
  const [commandName, ...rest] = parameters;
  if (commandName) {
    api.commandDetail(commandName);
  } else {
    api.help();
  }
}

export { cmd, api, description };

function getCommands() {
  // get commands from the commands directory
  // then get the description and usage from the js file
  const commands = fs.readdirSync(__dirname).map(name => {
    return { name: name, path: path.join(__dirname, name) };
  });
  let returnCommands = [];
  commands.forEach(commandPath => {
    if (commandPath.path != path.join(__dirname, 'index.js')) {
      const { description } = require(commandPath.path);
      returnCommands.push({
        Command: commandPath.name.replace('.js', ''),
        Description: description.short,
        Usage: description.usage
      });
    }
  });
  return returnCommands;
}
