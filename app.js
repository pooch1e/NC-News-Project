// app.js
const cors = require('cors')
const express = require('express');
const app = express();

//use cors
app.use(cors());

// parse JSON
app.use(express.json());

// import Routers
const apiRouter = require('./routes/apiRouter');
app.use('/api', apiRouter);


// serve HTML page
app.use('/', express.static('public'));



// import error handling
const {
  handleServerError,
  handleCustomError,
  handlePgErrors,
} = require('./errors/index.errors');

// ERROR HANDLING - must be in order
// Catch 404 - invalid route
app.use((req, res, next) => {
  next({ status: 404, msg: 'Route not found' });
});

app.use(handlePgErrors);
app.use(handleCustomError);
app.use(handleServerError);

module.exports = app;
