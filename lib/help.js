module.exports = function() {
  console.log(`
  Usage: syr-cli [options]

  Commands:
    watch                           Watches current working directory for changes and builds
    eject                           Ejects from the command line and does nothing
    link                            Links projects for compatible build platforms (ios, android)

  Options:
    -h, --help, help                Output usage information
    -v, --version, version          Output the version number

  `);
}
