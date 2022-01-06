'use strict';

const { connect } = require('mongoose');
const Logger = require('./logger');

const { DB_URL } = process.env;

module.exports = () => {
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  connect(DB_URL, options, err => {
    if (err) throw err;
    Logger.info('[DB] [Mongo] Successfully connected');
  });
};
