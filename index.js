/*
 *Main Server
 */

/*
Load environment variables
*/

try {
  require('dotenv-safe').config();
} catch (err) {
  if (err.name === 'MissingEnvVarsError') {
    console.log(
      'Some variables were defined in .env.example but are not present in the environment:',
      err.missing,
    );
  } else console.log(err);

  process.exit(1); // Failure
}

/*
 *Load libraries
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compress = require('compression');
const sequelize = require('./sequelize');
const services = require('./services');

/*
 *Middlewares
 */

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
  Database connection
*/

sequelize.authenticate()
  .then(() => {
		console.log('Connected to database!');
  })
  .catch(err => {
		console.log('Unable to connect to the database:');
		console.log(err.message);
		process.exit(1);
  })

/*
 *API Routes
 */

app.use('/app', services);

/*
  Any undefined route - Page not found
*/

app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: 'PAGE_NOT_FOUND',
    body: {},
  });
});

/*
 *Error middleware
 */

app.use((err, req, res, next) => {
  console.log(err);

  return res.status(500).json({
    success: false,
    message: 'INTERNAL_SERVER_ERROR',
    body: {},
  });
});

/*
 *Start web server
 */

const server = app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server running on ${process.env.IP}:${process.env.PORT}`);
});

// Export server for testing purposes
module.exports = server;
