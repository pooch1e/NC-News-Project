// api-router

const apiRouter = require('express').Router();

// import controllers
const { getApi } = require('../controllers/index.controllers');

//import routers
const topicsRouter = require('./topics.router');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');
const usersRouter = require('./users.router');

// HOMEPAGE - API

// apiRouter.get('/', getApi);

// TOPICS
apiRouter.use('/topics', topicsRouter);

// GET /articles
apiRouter.use('/articles', articlesRouter);

// GET comments
apiRouter.use('/articles/:article_id/comments', commentsRouter);

// PATCH/DELETE
apiRouter.use('/comments', commentsRouter);

// GET /users
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
