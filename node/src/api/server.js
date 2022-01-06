'use strict';

const http = require('http');

const logger = require('../logger');
const app = require('./app');

const httpServer = http.createServer(app);

httpServer.listen(process.env.API_PORT || 3000, () => {
  logger.info(`[Express] Server was successfully started on ${process.env.API_PORT || 3000}`);
});
