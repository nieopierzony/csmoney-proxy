'use strict';

const path = require('path');
const { Telegraf } = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');

const handlersController = require('./handlers');
const cacheUser = require('./middlewares/cacheUser');
const checkAccess = require('./middlewares/checkAccess');

const { TELEGRAM_TOKEN } = process.env;
const bot = new Telegraf(TELEGRAM_TOKEN);

bot.context.client = bot;

const i18n = new TelegrafI18n({
  defaultLanguage: 'ru',
  directory: path.resolve(__dirname, 'locales'),
  templateData: {
    pluralize: TelegrafI18n.pluralize,
  },
});
bot.use(i18n.middleware());

bot.use(cacheUser);
bot.use(checkAccess);

// Load up the handlers
handlersController(bot);

bot.launch();

module.exports = bot;
