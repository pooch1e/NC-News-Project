//comments router
const usersRouter = require('express').Router();

// import controller
const {
  getUsers
} = require('../controllers/index.controllers');

usersRouter.get('/users', getUsers);

module.exports = usersRouter;