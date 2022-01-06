'use strict';

const Stage = require('telegraf/stage');
const session = require('telegraf/session');
const startController = require('./start/index');

module.exports = bot => {
  startController(bot);

  const stage = new Stage([], { ttl: 15 });
  bot.use(session());
  bot.use(stage.middleware());
};
