// api-router

const apiRouter = require('express').Router();

// import controllers
const {
  getApi,
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleById,
  deleteCommentByCommentId,
  getUsers,
} = require('../controllers/index.controllers');

//import routers
const topicsRouter = require('./topics.router');
const articlesRouter = require('./articles.router');
const commentsRouter = require('./comments.router');
const usersRouter = require('./users.router');

// HOMEPAGE - API
apiRouter.get('/', getApi);

// TOPICS
apiRouter.use('/topics', topicsRouter);

// GET /articles
apiRouter.use('/articles', articlesRouter);

// DELETE comments
apiRouter.use('/comments', commentsRouter);

// GET /users
apiRouter.get('/users', usersRouter);

module.exports = apiRouter;
