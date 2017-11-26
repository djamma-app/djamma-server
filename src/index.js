import express from 'express';
import initLogger, { winston } from 'services/logger';

const LEVEL = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

initLogger(LEVEL);

const PORT = process.env.PORT || 5555;

const app = express();

app.listen(PORT, () => winston.info(`Server started on port ${PORT}`));
