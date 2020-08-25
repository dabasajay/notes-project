const express = require('express'),
  router = express.Router();

const sequelize = require('../../sequelize');
const { models } = require('../../sequelize');
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
  const userData = {
    username: req.body.username,
    password: req.body.password,
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
        status: 'error occurred',
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
  const loginFields = {
    username: req.body.username,
    password: req.body.password,
  };
  sequelize
    .sync()
    .then(() => {
      return User.findOne({
        where: loginFields,
      });
    })
    .then((user) => {
      const { dataValues: userData } = user;
      res.status(500).json({
        status: 'success',
        userId: userData.id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error occurred while finding the user!',
      });
    });
});

module.exports = router;
