//index.modles

const fetchTopics = require('./topics.models');
const { fetchArticles, fetchArticleById } = require('./articles.models');
const fetchUser = require('./user.models');

module.exports = { fetchTopics, fetchArticles, fetchArticleById, fetchUser };
