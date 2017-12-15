import express from 'express';
import initLogger, { winston } from 'services/logger';
import routes from 'routes';
import db from 'models';

const LEVEL = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

initLogger(LEVEL);

const PORT = process.env.PORT || 5555;

const app = express();

app.use(routes);

(async () => {
  try {
    db.init();
    await db.sequelize.sync();
    await db.sequelize.authenticate();
    app.listen(PORT, err => {
      if (err) {
        winston.error(err.stack);
        return;
      }
      winston.info(`Server started on port ${PORT}`);
    });
  } catch (e) {
    winston.error(e.stack);
  }
})();
