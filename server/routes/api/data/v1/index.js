'use strict';

const express = require('express')
  , authMiddleware = require('../../../middleware/auth');

const router = module.exports = new express.Router();

/**
 * @module DATA/V1
 *
 * @description
 * Base href is `/api/data/v1`
 */

router.use('*', authMiddleware, function (req, res, next) {
  if (!req.principal) {
    return res.apiFailed('USER_NOT_AUTHENTICATED', '');
  }
  next();
});

router.get('/test', function (req, res) {
  return res.apiSuccess({
    data: ['Hello', 'World']
  });
});
