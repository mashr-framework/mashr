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

    const argsCount = Object.keys(args._).length - 1;
    if (
      argsCount > 1 && (cmd === 'destroy' || cmd === 'help')
      || argsCount > 0 && !['destroy', 'help'].includes(cmd)
    ) {
      console.log('Invalid command - too many arguments');
      return;
    }

    await executeCommands(cmd, args);

  } catch (err) {
    throw(err);
  }
})();
