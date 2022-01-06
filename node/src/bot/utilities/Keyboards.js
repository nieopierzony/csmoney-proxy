'use strict';

const Markup = require('telegraf/markup');

module.exports = class Keyboards extends null {
  static start(ctx) {
    return Markup.inlineKeyboard([
      [Markup.callbackButton(ctx.i18n.t('start.btns.changeIP'), 'changeIP')],
      [Markup.callbackButton(ctx.i18n.t('start.btns.manageItems'), 'showInventory::0::desc')],
    ]);
  }

  static mainMenu(ctx, callBackData = 'start') {
    return Markup.inlineKeyboard([[Markup.callbackButton(ctx.i18n.t('start.btns.back'), callBackData)]]);
  }

  static inventory(ctx, page, totalPages, sortOrder, paginatedInventory) {
    const newSortBtnName = `${ctx.i18n.t('manageItems.sort.name')}: ${ctx.i18n
      .t(`manageItems.sort.${sortOrder}`)
      .toLowerCase()}`;
    return Markup.inlineKeyboard(
      [
        ...paginatedInventory.map(el => [Markup.callbackButton(`${el.fullName} | $${el.price}`, `skin::${el.id}`)]),
        [Markup.callbackButton(newSortBtnName, `showInventory::${page}::${sortOrder === 'desc' ? 'asc' : 'desc'}`)],
        [
          ...[page === totalPages ? Markup.callbackButton('⏮️', `showInventory::0::${sortOrder}`) : []],
          Markup.callbackButton(page === 0 ? '•' : '◀️', `showInventory::${page === 0 ? 999 : page - 1}::${sortOrder}`),
          Markup.callbackButton(`${page + 1} / ${totalPages}`, 'blank'),
          Markup.callbackButton(page + 1 === totalPages ? '•' : '▶️', `showInventory::${page + 1}::${sortOrder}`),
          ...[page === 0 ? Markup.callbackButton('⏭️', `showInventory::${totalPages - 1}::${sortOrder}`) : []],
        ].filter(el => !Array.isArray(el)),
        [
          ...[page !== 0 && page !== totalPages ? Markup.callbackButton('⏮️', `showInventory::0::${sortOrder}`) : []],
          ...[
            page !== 0 && page !== totalPages
              ? Markup.callbackButton('⏭️', `showInventory::${totalPages - 1}::${sortOrder}`)
              : [],
          ],
        ].filter(el => !Array.isArray(el)),
      ].filter(el => el.length >= 1),
    );
  }

  static manageSkin(ctx, skinID) {
    return Markup.inlineKeyboard([
      [
        Markup.callbackButton(ctx.i18n.t('manageItems.fade'), `changeSkin::${skinID}::fade`),
        Markup.callbackButton(ctx.i18n.t('manageItems.blue'), `changeSkin::${skinID}::blue`),
      ],
      [
        Markup.callbackButton(ctx.i18n.t('manageItems.overpay.stickers'), `changeSkin::${skinID}::stickers`),
        Markup.callbackButton(ctx.i18n.t('manageItems.overpay.float'), `changeSkin::${skinID}::float`),
      ],
      [Markup.callbackButton(ctx.i18n.t('manageItems.overpay.pattern'), `changeSkin::${skinID}::pattern`)],
    ]);
  }

  static skinBack(ctx, skinID) {
    return Markup.inlineKeyboard([[Markup.callbackButton(ctx.i18n.t('start.btns.back'), `skin::${skinID}`)]]);
  }
};
