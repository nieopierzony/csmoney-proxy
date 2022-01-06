'use strict';

const Scene = require('telegraf/scenes/base');
const Stage = require('telegraf/stage');

const startHandler = require('../start/start');

const Keyboards = require('../../utilities/Keyboards');
const Telegram = require('../../utilities/Telegram');
const Util = require('../../utilities/Util');

const { leave } = Stage;

const changeSkinScene = new Scene('changeSkinParam');

changeSkinScene.enter(ctx => {
  Telegram.send(ctx, ctx.i18n.t('manageItems.sceneEnter'), Keyboards.mainMenu(ctx, 'exit'));
});

changeSkinScene.action('exit', ctx => {
  leave();
  startHandler(ctx);
});

changeSkinScene.on('text', async ctx => {
  // Validate given IP
  const newValue = +ctx.message.text;
  const isValid = !isNaN(newValue);
  if (!isValid) {
    Telegram.send(ctx, ctx.i18n.t('errors.invalidNumber'));
    return false;
  }

  const { paramToChange, skinID } = ctx.session;

  const skin = ctx.user.inventory.find(el => el.id === skinID);
  if (!skin) {
    ctx.replyWithHTML(ctx.i18n.t('errors.skinNotFound'));
    leave();
    startHandler(ctx);
    return false;
  }

  const { id, fade, blue } = skin;
  const customItemSetting = ctx.user.customItemSettings.find(el => el.id === skinID);

  if (!customItemSetting) {
    const newSettings = { id, fade, blue, overpay: { float: -1, pattern: -1, stickers: -1 } };
    if (['float', 'pattern', 'stickers'].includes(paramToChange)) {
      newSettings.overpay[paramToChange] = newValue;
    } else {
      newSettings[paramToChange] = newValue;
    }
    ctx.user.customItemSettings.push(newSettings);
  } else {
    if (['float', 'pattern', 'stickers'].includes(paramToChange)) {
      customItemSetting.overpay[paramToChange] = newValue;
    } else {
      customItemSetting[paramToChange] = newValue;
    }
  }

  await ctx.user.save();

  Telegram.send(ctx, ctx.i18n.t('manageItems.successChange'), Keyboards.skinBack(ctx, skinID));
});
changeSkinScene.on('message', ctx => Telegram.send(ctx, ctx.i18n.t('errors.onlyTextMessages')));

module.exports = changeSkinScene;
