import { winston } from 'services/logger';

export default function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  let error;
  if (process.env.NODE_ENV !== 'production') {
    winston.error(error.stack);
  } else {
    winston.error(error);
  }
  res.status(500).send(error);
}
