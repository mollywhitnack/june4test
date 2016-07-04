'use strict';

const express = require('express');

let router = express.Router();

router.use('/residents', require('./residents'));
router.use('/apartments', require('./apartments'));

module.exports = router;