#!/usr/bin/env node
const os = require('os');
const minimist = require('minimist');
const executeCommand = require('../src/commands/executeCommand');
const catchSetupAndConfig = require('../src/utils/catchSetupAndConfig');

const homedir = os.homedir();

const args = minimist(process.argv.slice(2));
let cmd = args._[0] || 'help';

(async () => {
  try {

    if (args.version || args.v) { cmd = 'version'; }
    if (args.help || args.h) { cmd = 'help'; }

    if (Object.keys(args) === 1) {
      // ...
    } else if (Object.keys(args).length > 1) {
      console.log('Invalid command - too many arguments');
      return;
    }

    await executeCommand(cmd, args);
  } catch (err) {
    console.error(`Command Line Interface error => ${err.message}`);
  }
})();
