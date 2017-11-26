import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp}::${info.level.toUpperCase()}::${info.message} `;
});

export let winston;

export default (level = 'INFO') => {
  winston = createLogger({
    level,
    transports : [new transports.Console()],
    format     : combine(timestamp(), myFormat),
  });
};
