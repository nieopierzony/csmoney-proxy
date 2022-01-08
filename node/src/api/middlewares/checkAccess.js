'use strict';

const { SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error();

    const token = authorization.split(' ')[1];
    if (!token || token !== SECRET_KEY) throw new Error();

    return next();
  } catch (err) {
    res.status(403).send({ success: false, error: 'You do not have access to do this action' });
    return false;
  }
};
