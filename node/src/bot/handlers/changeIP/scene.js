'use strict';

const Scene = require('telegraf/scenes/base');
const Stage = require('telegraf/stage');

const startHandler = require('../start/start');

const Keyboards = require('../../utilities/Keyboards');
const Telegram = require('../../utilities/Telegram');
const Util = require('../../utilities/Util');

const { leave } = Stage;

const changeIPScene = new Scene('changeIP');

changeIPScene.enter(ctx => {
  Telegram.send(ctx, ctx.i18n.t('changeIP.sceneEnter', { ip: ctx.user.ip }), Keyboards.mainMenu(ctx, 'exit'));
});

changeIPScene.action('exit', ctx => {
  leave();
  startHandler(ctx);
});

changeIPScene.on('text', async ctx => {
  // Validate given IP
  const givenIP = ctx.message.text;
  const isValidIP = Util.isValidIP(givenIP);
  if (!isValidIP) {
    Telegram.send(ctx, ctx.i18n.t('errors.invalidIP'));
    return false;
  }

  // Save IP in database
  ctx.user.ip = givenIP;
  await ctx.user.save();
  Telegram.send(ctx, ctx.i18n.t('changeIP.success'), Keyboards.mainMenu(ctx));
});
changeIPScene.on('message', ctx => Telegram.send(ctx, ctx.i18n.t('errors.onlyTextMessages')));

module.exports = changeIPScene;
