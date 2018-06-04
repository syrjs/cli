import blargs from 'blargs';
import updateNotifier from 'update-notifier';
import packageJSON from '../package.json';

updateNotifier({ pkg: packageJSON }).notify();

function boot() {
  // get blargs
  let ret = blargs();
  let switches = ret[0] || {};
  let positionals = ret[1] || [];

  return {
    positionals,
    switches
  };
}

export { boot };
