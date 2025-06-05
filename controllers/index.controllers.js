//index.controllers

const getApi = require('./api.controller');
const getTopics = require('./topics.controller');
const { getArticles, getArticleById } = require('./articles.controller');
const getCommentsByArticleId = require('./comments.controller');
const getUsers = require('./users.controller');

module.exports = {
  getApi,
  getTopics,
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  getUsers,
};
