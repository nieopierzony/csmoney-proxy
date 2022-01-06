'use strict';

const Keyboards = require('../../utilities/Keyboards');
const Telegram = require('../../utilities/Telegram');

const PAGE_SIZE = 7;

module.exports = ctx => {
  try {
    const [, page, sortOrder] = ctx.match;

    const totalPages = Math.floor(ctx.user.inventory.length / 7);
    if (+page >= totalPages) return ctx.answerCbQuery(ctx.i18n.t('errors.pageNotExists'));

    const paginatedInventory = ctx.user.inventory
      .filter(el => el.price)
      .sort((a, b) => (sortOrder === 'desc' ? b.price - a.price : a.price - b.price))
      .slice(PAGE_SIZE * +page, PAGE_SIZE * +page + PAGE_SIZE);

    const messageContent = ctx.i18n.t('manageItems.inventory', { totalPages });
    const keyboard = Keyboards.inventory(ctx, +page, totalPages, sortOrder, paginatedInventory);
    Telegram.send(ctx, messageContent, keyboard);
  } catch (err) {
    console.error(err);
    ctx.reply('Error');
  }
};
