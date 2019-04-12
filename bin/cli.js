#!/usr/bin/env node
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
let cmd = args._[0] || 'help';

if (args.version || args.v) {
  cmd = 'version';
}

if (args.help || args.h) {
  cmd = 'help';
}

switch (cmd) {
  case 'init':
    require('../src/commands/init')(args);
    break;
  case 'version':
    require('../src/commands/version')(args);
    break;
  case 'help':
    require('../src/commands/help')(args);
    break;
  default:
    console.log(`"${cmd}" is not a valid command`);
    break;
}

