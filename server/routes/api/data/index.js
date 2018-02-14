'use strict';

const express = require('express');

const router = module.exports = new express.Router();

router.use('/api/data/v1', require('./v1'));
