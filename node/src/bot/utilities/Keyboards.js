'use strict';

const Markup = require('telegraf/markup');

module.exports = class Keyboards extends null {
  static start(ctx) {
    return Markup.inlineKeyboard([[Markup.callbackButton(ctx.i18n.t('start.btns.featured'), 'featured')]]);
  }
};
