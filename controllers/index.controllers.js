//index.controllers

const getApi = require('./api.controller');
const getTopics = require('./topics.controller');
const { getArticles, getArticleById, patchArticleById } = require('./articles.controller');
const {getCommentsByArticleId, postCommentByArticleId, deleteCommentByCommentId} = require('./comments.controller');
const {getUsers, getUsersByUsername} = require('./users.controller');

module.exports = {
  getApi,
  getTopics,
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleById,
  deleteCommentByCommentId,
  getUsers,
  getUsersByUsername
};
