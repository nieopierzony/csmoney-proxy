'use strict';

module.exports = bot => {
  bot.action('changeIP', ctx => ctx.scene.enter('changeIP'));
};
