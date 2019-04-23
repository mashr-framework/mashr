#!/usr/bin/env node
const minimist = require('minimist');
const executeCommands = require('../src/commands/executeCommands');
// const ora = require('ora');
const args = minimist(process.argv.slice(2));
let cmd = args._[0] || 'help';

(async () => {
  // const spinner = ora().start();
  try {

    if (args.version || args.v) { cmd = 'version'; }
    if (args.help || args.h) { cmd = 'help'; }
    if (cmd === 'ls') { cmd = 'list'; }

    if (Object.keys(args._).length > 2) {
      console.log('Invalid command - too many arguments');
      return;
    }

    await executeCommands(cmd, args);
    // spinner.stop();

  } catch (err) {
    // spinner.stop();
    throw(err);
    // console.error(`Command Line Interface error => ${err.message}`);
  }
})();
