import * as winston from  'winston';

var consoleLogger = new winston.Logger({
    exitOnError: true
});

consoleLogger.add(winston.transports.Console, {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
});

export default consoleLogger;