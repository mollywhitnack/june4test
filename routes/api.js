'use strict';

const express = require('express');

let router = express.Router();

//router.use('/residents', require('./residents'));
router.use('/albums', require('./albums'));
router.use('/pictures', require('./pictures'));

module.exports = router;