const express = require('express'),
  router = express.Router();

const sequelize = require('../../sequelize');
const { models } = require('../../sequelize');
const isValid = require('../../utils/isValid');
const User = models.users;

/*
    @route : `POST` `/app/user`
    @desc  : Create a user account
    @Request Data: {
      'username': str,
      'password': str
    }
    @Response Data: {
      'status': 'account created'
    }
*/

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  if (!isValid(username) || !isValid(password)) {
    return res.status(400).json({
      status: 'Bad request: invalid data',
    });
  }
  const userData = {
    username,
    password,
  };
  sequelize
    .sync()
    .then(() => {
      return User.create(userData);
    })
    .then((user) => {
      res.status(200).json({
        status: 'account created',
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: err.message ? err.message : 'error occured!',
      });
    });
});

/*
    @route : `POST` `/app/user/auth`
    @desc  : Login using user credentials.
    @Request Data: {
      'username': str,
      'password': str
    }
    @Response Data: {
      'status': 'success',
      'userId': int
    }
*/

router.post('/auth', (req, res, next) => {
  const { username, password } = req.body;
  if (!isValid(username) || !isValid(password)) {
    return res.status(400).json({
      status: 'Bad request: invalid data',
    });
  }
  const loginFields = {
    username,
    password,
  };
  sequelize
    .sync()
    .then(() => {
      return User.findOne({
        where: loginFields,
      });
    })
    .then((user) => {
      if (user == null) {
        throw new Error('User not found');
      }
      const { dataValues: userData } = user;
      res.status(500).json({
        status: 'success',
        userId: userData.id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: err.message ? err.message : 'error occured!',
      });
    });
});

module.exports = router;
