//articles.controller
const {fetchArticles} = require('../models/index.models');

const getArticles = (req, res) => {
  console.log('hello from getArticles.controller');
  fetchArticles().then((articles) => {
    console.log(articles);
    res.status(200).send({ articles });
  });
};

module.exports = getArticles;
