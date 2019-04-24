const chalk = require('chalk');

module.exports = function mashrLogger(spinner, state, text) {
  const indicator = chalk.bold.italic.red('Mashr:');

  switch (state) {
    case 'start':
      spinner.start(`${indicator} ${text}`);
      break;
    case 'succeed':
      spinner.succeed(`${indicator} ${text}`);
      break;
    case 'fail':
      spinner.fail(`${indicator} ${text}`);
      break;
    case 'warn':
      spinner.warn(`${indicator} ${text}`);
      break;
  }
};
