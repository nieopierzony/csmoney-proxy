'use strict';

const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const startController = require('./start/index');
const changeIPController = require('./changeIP');
const manageItemsController = require('./manageItems');

const changeIPScene = require('./changeIP/scene');
const changeSkinScene = require('./manageItems/changeSkinParam');

module.exports = bot => {
  const stage = new Stage([changeIPScene, changeSkinScene], { ttl: 15 });
  bot.use(session());
  bot.use(stage.middleware());

  startController(bot);
  changeIPController(bot);
  manageItemsController(bot);
};
