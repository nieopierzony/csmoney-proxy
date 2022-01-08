'use strict';

const { Router } = require('express');
const Controller = require('../controllers/Users/index');

const router = Router();

router.route('/:id/updateInventory').post(Controller.updateInventory);

module.exports = router;
