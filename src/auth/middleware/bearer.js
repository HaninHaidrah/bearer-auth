'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login') }

    const token = req.headers.authorization.split(' ')[1];
    console.log("==========================",token);
    const validUser = await users.authenticateToken(token);
    console.log(validUser);

    req.user = validUser;
    next()
    // req.token = validUser.token;

  } catch (e) {
    res.status(403).send('Invalid Login');;
  }
}
