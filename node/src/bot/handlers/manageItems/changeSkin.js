'use strict';

const Keyboards = require('../../utilities/Keyboards');
const Telegram = require('../../utilities/Telegram');

module.exports = async ctx => {
  try {
    const id = +ctx.match[1];

    const skin = ctx.user.inventory.find(el => el.id === id);
    if (!skin) {
      Telegram.send(ctx, ctx.i18n.t('errors.skinNotFound'), Keyboards.mainMenu());
      return false;
    }

    ctx.session.paramToChange = ctx.match[2];
    ctx.session.skinID = id;

    ctx.scene.enter('changeSkinParam');
  } catch (err) {
    console.error(err);
    ctx.reply('Error');
  }
};
