'use strict';

const path = require('path');
const { Telegraf } = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');

const handlersController = require('./handlers');

const { TELEGRAM_TOKEN } = process.env;
console.log(TELEGRAM_TOKEN);
const bot = new Telegraf(TELEGRAM_TOKEN);

const i18n = new TelegrafI18n({
  defaultLanguage: 'ru',
  directory: path.resolve(__dirname, 'locales'),
});
bot.use(i18n.middleware());

// Load up the handlers
handlersController(bot);

bot.launch();

module.exports = bot;
