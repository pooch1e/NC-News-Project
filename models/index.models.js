//index.modles

const fetchTopics = require('./topics.models');
const fetchArticles = require('./articles.models');

exports.modules = {
  ...fetchTopics,
  ...fetchArticles,
};
