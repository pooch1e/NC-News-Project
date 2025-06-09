// articles router

const articlesRouter = require('express').Router();

// import controller
const {
  getArticles,
  getArticleById,
  patchArticleById,
  postArticle
} = require('../controllers/index.controllers');

const commentsRouter = require('./comments.router');

articlesRouter.get('/', getArticles);

articlesRouter.get('/:article_id', getArticleById);

articlesRouter.patch('/:article_id', patchArticleById);

articlesRouter.post('/', postArticle)

// DELETE comments
articlesRouter.use('/:article_id/comments', commentsRouter);

module.exports = articlesRouter;
