const { transports, format, createLogger } = require('winston');
const expressWinston = require('express-winston');

const { splat, combine, timestamp, printf, colorize } = format;


const expressFormat = () => (
  printf(({ timestamp, level, message, meta }) => {
    return `findrmote API - ${level} - [${timestamp}] : '${message}' ${meta.res?.statusCode}`;
  })
)


const generalFormat = (name) => (
  printf(({ timestamp, level, message }) => {
    return `${name} - ${level} - [${timestamp}] : '${message}'`;
  })
)


const ExpressLogger = () => {
  return expressWinston.logger({
    level: process.env.LOG_LEVEL || 'info',
    levels: { error: 0, warn: 1, info: 2 },
    transports: [new transports.Console()],
    format: combine(colorize(), timestamp(), splat(), expressFormat()),
    colorize: true,
  });
}


const Logger = (name = 'Logger') => {
  return createLogger({
    level: process.env.LOG_LEVEL || 'info',
    levels: { error: 0, warn: 1, info: 2 },
    transports: [new transports.Console()],
    format: combine(colorize(), timestamp(), splat(), generalFormat(name)),
    colorize: true,
  })
}


module.exports = { ExpressLogger, Logger };
