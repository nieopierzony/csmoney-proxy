'use strict';

const Keyboards = require('../../utilities/Keyboards');
const { send } = require('../../utilities/Telegram');

module.exports = ctx => {
  try {
    send(ctx, ctx.i18n.t('start.greeting'), Keyboards.start(ctx));
  } catch (err) {
    console.error(err);
  }
};
