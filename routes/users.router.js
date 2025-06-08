//comments router
const usersRouter = require('express').Router();

// import controller
const { getUsers, getUsersByUsername } = require('../controllers/index.controllers');

usersRouter.get('/', getUsers);
usersRouter.get('/:username', getUsersByUsername)

module.exports = usersRouter;
