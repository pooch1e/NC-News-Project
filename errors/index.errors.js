const { handleServerError } = require('./server.errors');
const { handleCustomError } = require('./custom.errors');
const { handlePgErrors } = require('./pg.errors');

module.exports = { handleServerError, handleCustomError, handlePgErrors };
