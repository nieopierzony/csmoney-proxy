'use strict';

const Telegram = require('../utilities/Telegram');
const logger = require('../../logger');

module.exports = (ctx, next) => {
  try {
    if (!ctx.user) throw new Error('User was not found');
    if (ctx.user.accessTill <= Date.now()) {
      Telegram.send(ctx, ctx.i18n.t('errors.accessError'));
      return;
    }

    next();
  } catch (err) {
    logger.error(`[CheckAccess Err] ${err}`);
  }
};
