const express = require('express'),
  router = express.Router();

const userAPI = require('./user');
const notesAPI = require('./notes');

/*
    API routes
    @route : /app/<>
*/

router.use('/user', userAPI);
router.use('/sites', notesAPI);

module.exports = router;
