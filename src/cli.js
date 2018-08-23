#! /usr/bin/env node
import 'regenerator-runtime/runtime';
import projectPackage from '../package.json';
import { project as syrProject } from 'models/projects/syr';
import { log } from 'utils/logger';

const currentVersion = syrProject.data && syrProject.data.currentVersion;

log('');
log(`${log.chalk.yellow('Syr CLI')} v${projectPackage.version}`);
log.info(
  `[Current Project Version: ${log.chalk.magenta(
    currentVersion
  )}] [Current Project Release: ${log.chalk.magenta('none')}]`
);

/**
 * !!! bin entry
 */
import { main } from './index';

main();
