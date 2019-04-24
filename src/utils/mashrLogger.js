const chalk = require('chalk');

module.exports = function mashrLogger(spinner, state, text) {
  const indicator = chalk.bold.italic.red('Mashr:');

  switch (state) {
    case 'start':
      text ? spinner.start(`${indicator} ${text}`) : spinner.start();
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
