'use strict';

require('dotenv').config();

require('./mongoose')();
require('./bot/index');
require('./api/server');
