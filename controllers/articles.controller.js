//articles.controller
const { fetchArticles, fetchArticleById } = require('../models/index.models');

const getArticles = (req, res) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

const getArticleById = (req, res) => {
  const { article_id } = req.params;

  console.log(article_id);
  console.log('hello from article ID');
  fetchArticleById(article_id).then((articles) => {
    res.status(200).send({ articles });
  });
};

module.exports = { getArticles, getArticleById };
