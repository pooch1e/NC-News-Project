//comments router
const commentsRouter = require('express').Router({ mergeParams: true });

// import controller
const {
  getCommentsByArticleId,
  postCommentByArticleId,
  patchCommentById,
  deleteCommentByCommentId,
} = require('../controllers/index.controllers');

commentsRouter.get('/', getCommentsByArticleId); // articles/:article_id/comments

commentsRouter.post('/', postCommentByArticleId); //articles/:article_id/comments

// /api/comments/:comment_id
commentsRouter.patch('/:comment_id', patchCommentById); //

commentsRouter.delete('/:comment_id', deleteCommentByCommentId);

module.exports = commentsRouter;
