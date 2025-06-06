//index.modles

const fetchTopics = require('./topics.models');
const { fetchArticles, fetchArticleById, updateArticleById } = require('./articles.models');
const {
  fetchCommentsById,
  insertCommentByArticleId,
  removeCommentById
} = require('./comments.models');
const fetchUser = require('./user.models');

module.exports = {
  fetchTopics,
  fetchArticles,
  fetchArticleById,
  fetchCommentsById,
  insertCommentByArticleId,
  updateArticleById,
  removeCommentById,
  fetchUser,
};
