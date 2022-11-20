// const winston = require('winston');
import { createLogger, format, transports, addColors } from 'winston';
const { combine, timestamp, colorize, printf } = format;

const logFormat = printf((info) => {
  const formattedDate = info.timestamp.replace('T', ' ').replace('Z', '');
  return `${formattedDate} [${info.level}]: ${info.message};`;
});

addColors({
  error: 'red',
  warn: 'yellow'
});

const logger = createLogger({
  format: combine(colorize(), timestamp(), logFormat),
  transports: [
    // if not production, log to console
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
    }),
    new transports.File({ filename: 'debug.log', level: 'debug' }),
    new transports.File({ filename: 'error.log', level: 'error' })
  ],
  exitOnError: false
});

logger.error = (err): any => {
  if (err instanceof Error) {
    logger.log({ level: 'error', message: `${err.stack || err}` });
  } else {
    logger.log({ level: 'error', message: err });
  }
};
if (process.env.NODE_ENV !== 'production') {
  logger.debug('>>> starting customer-service...(99%) <<<');
}

export default logger;
