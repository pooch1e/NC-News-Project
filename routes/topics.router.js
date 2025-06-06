// topics router
const topicsRouter = require('express').Router()

// import controller
const {getTopics} = require('../controllers/index.controllers');

topicsRouter.get('/', getTopics);

module.exports = topicsRouter;
