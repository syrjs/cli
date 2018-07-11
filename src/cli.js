#! /usr/bin/env node
import 'regenerator-runtime/runtime';
import projectPackage from '../package.json';
import { project as syrProject } from 'models/projects/syr';

import { log } from 'utils/logger';

const currentVersion = syrProject.data && syrProject.data.currentVersion;

log('');
log(`${log.chalk.yellow('Syr CLI')}`);
log.info(
  `[v${projectPackage.version}] [Current Version: ${log.chalk.magenta(
    currentVersion
  )}]`
);

/**
 * !!! bin entry
 */
import { main } from './index';

main();
