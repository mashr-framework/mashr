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

    const keys = Object.keys(args._);
    if (keys.length > 2 && cmd === 'destroy' || keys.length > 1 && cmd !== 'destroy') {
      console.log('Invalid command - too many arguments');
      return;
    }

    await executeCommands(cmd, args);

  } catch (err) {
    throw(err);
  }
})();
