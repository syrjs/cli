function commands(command, optionals) {
  let module;
  try {
    module = require(`./${command}`);
  } catch (e) {
    if (e.message.indexOf('Cannot find module') > -1) {
      console.log(`Command Not Found: ${command}`);
    }
  }
  module.cmd.apply(this, optionals);
}

export { commands };
