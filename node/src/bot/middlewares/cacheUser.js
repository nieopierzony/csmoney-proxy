'use strict';

const logger = require('../../logger');
const User = require('../../models/User');

module.exports = async (ctx, next) => {
  try {
    const user = await User.findOne({ id: ctx.from.id });
    if (user) {
      ctx.user = user;
      return next();
    }

    ctx.user = await User.create({ id: ctx.from.id });
    return next();
  } catch (err) {
    logger.error(`[CacheUser ERR] ${err}`);
  }
};
