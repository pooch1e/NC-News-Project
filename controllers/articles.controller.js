//articles.controller
const { fetchArticles } = require('../models/index.models');

const getArticles = (req, res) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

module.exports = getArticles;
