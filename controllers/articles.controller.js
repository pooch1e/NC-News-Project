//articles.controller
const { fetchArticles, fetchArticleById } = require('../models/index.models');

const getArticles = async (req, res) => {
  try {
    const articles = await fetchArticles();
    res.status(200).send({ articles });
  } catch (err) {
    console.log(err);
  }
};

const getArticleById = async (req, res) => {
  const { article_id } = req.params;
  try {
    const articles = await fetchArticleById(article_id);
    res.status(200).send({ articles });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getArticles, getArticleById };
