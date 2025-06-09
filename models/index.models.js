//index.modles

const fetchTopics = require('./topics.models');
const {
  fetchArticles,
  fetchArticleById,
  updateArticleById,
  postNewArticle,
} = require('./articles.models');
const {
  fetchCommentsByArticleId,
  insertCommentByArticleId,
  updateCommentsByCommentId,
  removeCommentById,
} = require('./comments.models');
const { fetchUser, fetchUserByUsername } = require('./user.models');

module.exports = {
  fetchTopics,
  fetchArticles,
  fetchArticleById,
  postNewArticle,
  fetchCommentsByArticleId,
  insertCommentByArticleId,
  updateArticleById,
  updateCommentsByCommentId,
  removeCommentById,
  fetchUser,
  fetchUserByUsername,
};
