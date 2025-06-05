const { handleServerError } = require('./server.errors');
const { handleCustomError } = require('./custom.errors');

module.exports = { handleServerError, handleCustomError };
