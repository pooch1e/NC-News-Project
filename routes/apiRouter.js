// api-router

const apiRouter = require('express').Router();

// import controllers
const {
  getApi,
  getTopics,
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleById,
  deleteCommentByCommentId,
  getUsers,
} = require('../controllers/index.controllers');

apiRouter.get('/', getApi);

// GET /topics
apiRouter.get('/topics', getTopics);

// GET /articles
apiRouter.get('/articles', getArticles);

// GET /api/articles/:article_id
apiRouter.get('/articles/:article_id', getArticleById);

// PATCH /api/articles/:article_id
apiRouter.patch('/articles/:article_id', patchArticleById);

// GET /api/articles/:article_id/comments
apiRouter.get('/articles/:article_id/comments', getCommentsByArticleId);

// POST /api/articles/:article_id/comments
apiRouter.post('/articles/:article_id/comments', postCommentByArticleId);

// DELETE /api/comments/:comment_id
apiRouter.delete('/comments/:comment_id', deleteCommentByCommentId);

// GET /users
apiRouter.get('/users', getUsers);

module.exports = apiRouter;
