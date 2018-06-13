'use strict';

const $ = require('./index')
  , User = require('../../../../model/user')
  , utils = require('../../../../utils');

const PREFIX = '/signup';

/**
 * @memberOf module:SCIM/V1
 *
 * @function POST /signup
 *
 * @description
 * Log in user.
 *
 * @param {string} email - email of the user to login
 * @param {string} password - user password
 * @param {string} firstName - first name of the user
 * @param {string} lastName - Last name name of the user
 *
 * @returns {Object} results - response if user logged in successfully.
 * @returns {string} results.authToken - authorization token to perform other requests
 * @returns {module:Types.UserClient} results.user - user that is logged in
 */

$.post(PREFIX, function (req, res, next) {
  User.findOne({
    email: req.body.email
  }).then(async function (existingUser) {
    if (existingUser) {
      return res.apiFailed('USER_ALREADY_EXISTS', 'User with this email already exists.');
    }

    let user = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    await user.setPassword(req.body.password);

    let saved = await user.save();

    utils.jwtSign({
      user: saved.id
    }, function (err, authToken) {
      if (err) return next(err);
      return res.apiSuccess({
        authToken: authToken,
        user: saved.client
      });
    });

  }).catch(next);
});
