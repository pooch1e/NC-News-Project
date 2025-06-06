//comments router
const commentsRouter = require('express').Router({mergeParams: true});

// import controller
const {
  getCommentsByArticleId, postCommentByArticleId, deleteCommentByCommentId
} = require('../controllers/index.controllers');

commentsRouter.get('/', getCommentsByArticleId); // articles/:article_id/comments

commentsRouter.post('/', postCommentByArticleId) //articles/:article_id/comments

commentsRouter.delete('/:comment_id', deleteCommentByCommentId)

module.exports = commentsRouter;