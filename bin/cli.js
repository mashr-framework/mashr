#!/usr/bin/env node
const minimist = require('minimist');
const executeCommands = require('../src/commands/executeCommands');

const args = minimist(process.argv.slice(2));
let cmd = args._[0] || 'help';

(async () => {
  try {

    if (args.version || args.v) { cmd = 'version'; }
    if (args.help || args.h) { cmd = 'help'; }
    if (cmd === 'ls') { cmd = 'list'; }

    if (Object.keys(args._).length > 2) {
      console.log('Invalid command - too many arguments');
      return;
    }

    await executeCommands(cmd, args);
  } catch (err) {
    throw(err);
    // console.error(`Command Line Interface error => ${err.message}`);
  }
})();
