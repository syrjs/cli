function commands(command, optionals) {
  let module;
  try {
    module = require(`./${command}`);
  } catch (e) {
    console.log(e);
  }
  module.cmd.apply(this, optionals);
}

export { commands };
