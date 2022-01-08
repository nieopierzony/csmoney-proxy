'use strict';

const changeSkin = require('./changeSkin');
const showInventory = require('./showInventory');
const showSkin = require('./skin');

module.exports = bot => {
  bot.action(/^showInventory(?:::(\w+))(?:::(\w+))$/, showInventory);
  bot.action(/^skin(?:::(\w+))$/, showSkin);
  bot.action(/^changeSkin(?:::(\w+))(?:::(\w+))$/, changeSkin);
};
