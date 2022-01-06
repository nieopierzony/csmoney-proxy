'use strict';

const { Router } = require('express');

const userRouter = require('./users');
const checkAccess = require('../middlewares/checkAccess');

const router = Router();

router.use('/users', checkAccess, userRouter);

module.exports = router;
