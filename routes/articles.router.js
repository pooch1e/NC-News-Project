// articles router

const articlesRouter = require('express').Router();

// import controller
const {
  getArticles,
  getArticleById,
  patchArticleById,
} = require('../controllers/index.controllers');

const commentsRouter = require('./comments.router');

articlesRouter.get('/', getArticles);

articlesRouter.get('/:article_id', getArticleById);

articlesRouter.patch('/:article_id', patchArticleById);

// DELETE comments
articlesRouter.use('/:article_id/comments', commentsRouter);

module.exports = articlesRouter;
