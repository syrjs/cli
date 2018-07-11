// commands execute when called through the cli
// syr {command}

async function commands(command, optionals) {
  let module;
  try {
    module = require(`./${command}`);
  } catch (e) {
    console.log(e);
  }
  await module.cmd.apply(this, optionals);
}

export { commands };
