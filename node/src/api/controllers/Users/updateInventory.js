'use strict';

const logger = require('../../../logger');
const User = require('../../../models/User');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    if (!user) {
      res.status(404).send({ success: false, error: 'User was not found' });
      return false;
    }

    if (!req.body.inventory) {
      res.status(400).send({ success: false, error: 'New inventory was not provided' });
      return false;
    }

    user.inventory = req.body.inventory;
    await user.save();

    res.status(200).send({ success: true });
  } catch (err) {
    logger.err(`[UpdateInventory Err] ${err}`);
  }
};
