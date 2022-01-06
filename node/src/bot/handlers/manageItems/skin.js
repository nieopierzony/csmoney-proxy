'use strict';

const Extra = require('telegraf/extra');

const Keyboards = require('../../utilities/Keyboards');
const Telegram = require('../../utilities/Telegram');

module.exports = async ctx => {
  try {
    const id = +ctx.match[1];

    const skin = ctx.user.inventory.find(el => el.id === id);
    if (!skin) {
      Telegram.send(ctx, ctx.i18n.t('errors.skinNotFound'));
      return false;
    }

    const { fullName, price, fade, blue, overpay } = skin;
    let messageContent = ctx.i18n.t('manageItems.skinInfo', { fullName, price, fade, blue, overpay });

    const customSettings = ctx.user.customItemSettings.find(el => el.id === id);
    if (customSettings) {
      messageContent = ctx.i18n.t('manageItems.skinInfo', {
        fullName,
        price,
        fade: customSettings.fade,
        blue: customSettings.blue,
        overpay: customSettings.overpay,
      });
    }

    if (skin.img) {
      await ctx.replyWithPhoto(skin.img);
    }

    const keyboard = Keyboards.manageSkin(ctx, id);
    ctx.reply(messageContent, Extra.HTML().markup(keyboard));
  } catch (err) {
    console.error(err);
    ctx.reply('error');
  }
};
