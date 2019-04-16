module.exports = async function executeCommand(cmd, args) {
  switch (cmd) {
    case 'init':
      require('./init')(args);
      break;
    case 'deploy':
      require('./deploy')(args);
      break;
    case 'list':
      require('./list')(args);
      break;
    case 'version':
      require('./version')(args);
      break;
    case 'help':
      require('./help')(args);
      break;
    default:
      console.log(`"${cmd}" is not a valid command`);
      break;
  }
};
