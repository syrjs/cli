import blargs from 'blargs';

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
