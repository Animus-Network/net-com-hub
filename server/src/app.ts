import express, { Express } from 'express';
import { Config as config } from '../config/config';
import router from './routes/base.route';
import { httpLogger, baseLogger } from '../lib/pino-http';
import socket from '../lib/socket';
import mongodb from './services/mongodb.service';

const app: Express = express();
socket.__use__(app);

app.use(express.json());
app.use(httpLogger);
app.use('/', router);

// Start the server
app.listen(config.PORT, config.HOST, () => {
    baseLogger.debug(`Server is running on port ${config.PORT}`);
    mongodb.connect();
});