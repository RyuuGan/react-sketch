'use strict';

const express = require('express')
  , User = require('../../../../model/user')
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

router.get('/users', function (req, res, next) {
  User
    .paginate({})
    .exec(function (err, results) {
      if (err) return next(err);
      res.apiSuccess(results);
    });
});
