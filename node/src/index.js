'use strict';

require('dotenv').config();

require('./services/mongoose')();
require('./bot/index');
require('./api/server');

const copyUsers = require('./services/copyUsers');
setInterval(copyUsers, 10 * 1000);
