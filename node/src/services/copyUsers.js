'use strict';

const fs = require('fs');
const logger = require('../logger');
const User = require('../models/User');

const USERS_FILE_PATH = '/srv/config/users.json';

module.exports = async () => {
  try {
    const users = await User.find({});
    const serializedUsers = users.map(user => ({
      id: user.id,
      ip: user.ip,
      access_till: user.accessTill.getTime(),
      items: user.customItemSettings,
    }));

    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(serializedUsers));
  } catch (err) {
    logger.error(`[CopyUsers Err] ${err}`);
  }
};
