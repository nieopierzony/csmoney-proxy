'use strict';

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const router = require('./routes/index');

const app = express();

app.set('x-powered-by', false);

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(router);

module.exports = app;
