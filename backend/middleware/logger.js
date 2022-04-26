const SimpleNodeLogger = require('simple-node-logger'),
  opts = {
    logFilePath: 'mylogfile.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
  },
  log = SimpleNodeLogger.createSimpleLogger(opts);
log.setLevel('warn');

module.exports = log;