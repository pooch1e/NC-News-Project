//index.controllers

const getApi = require('./api.controller');
const getTopics = require('./topics.controller');
const {
  getArticles,
  getArticleById,
  patchArticleById,
  postArticle
} = require('./articles.controller');
const {
  getCommentsByArticleId,
  postCommentByArticleId,
  patchCommentById,
  deleteCommentByCommentId,
} = require('./comments.controller');
const { getUsers, getUsersByUsername } = require('./users.controller');

module.exports = {
  getApi,
  getTopics,
  getArticles,
  getArticleById,
  postArticle,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleById,
  patchCommentById,
  deleteCommentByCommentId,
  getUsers,
  getUsersByUsername,
};
