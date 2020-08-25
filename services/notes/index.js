const express = require('express'),
  router = express.Router();

const sequelize = require('../../sequelize');
const { models } = require('../../sequelize');
const Notes = models.notes;
const User = models.users;

/*
    @route : `GET` `/app/sites/list?user={userId}`
    @desc  : Provide list of stored notes for the logged-in user
    @Request Data: None
    @Response Data: [List of saved notes]
*/

router.get('/list', (req, res, next) => {
  const userId = parseInt(req.query.user, 10);
  sequelize
    .sync()
    .then(() => {
      return User.findByPk(userId);
    })
    .then((user) => {
      if (user == null) {
        throw new Error('User not found');
      }
      return user;
    })
    .then((user) => {
      return Notes.findAll({
        where: {
          userId: user.id,
        },
      });
    })
    .then((notes) => {
      res.status(200).json({
        notes: notes,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: err.message ? err.message : 'error occured!',
      });
    });
});

/*
    @route : `POST` `/app/sites?user={userId}`
    @desc  : Create a note.
    @Request Data: {
      'note': str
    }
    @Response Data: {
      'status': 'success'
    }
*/

router.post('/', (req, res, next) => {
  const userId = parseInt(req.query.user, 10);
  const notesData = {
    note: req.body.note,
    userId: userId,
  };
  sequelize
    .sync()
    .then(() => {
      return User.findByPk(userId);
    })
    .then((user) => {
      if (user == null) {
        throw new Error('User not found');
      }
    })
    .then(() => {
      return Notes.create(notesData);
    })
    .then((note) => {
      res.status(200).json({
        status: 'success',
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: err.message ? err.message : 'error occured!',
      });
    });
});

module.exports = router;
