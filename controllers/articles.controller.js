//articles.controller
const {
  fetchArticles,
  fetchArticleById,
  updateArticleById,
} = require('../models/index.models');

const getArticles = async (req, res) => {
  try {
    const articles = await fetchArticles();
    res.status(200).send({ articles });
  } catch (err) {
    throw err;
  }
};

const getArticleById = async (req, res) => {
  const { article_id } = req.params;
  try {
    //invalid id
    if (isNaN(article_id)) {
      return Promise.reject({ status: 400, msg: 'invalid id' });
    }
    const articles = await fetchArticleById(article_id);
    //db error or non-existent article id
    if (!isNaN(article_id) && articles.length === 0) {
      return Promise.reject({ status: 404, msg: 'id not found' });
    }
    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};

const patchArticleById = async (req, res) => {

  const { article_id } = req.params;
  const { inc_votes } = req.body; //typeof number

  try {
    const patchedArticle = await updateArticleById(inc_votes, article_id);
    res.status(200).send({ updatedArticle: patchedArticle });
  } catch (err) {
    throw err;
  }
};

module.exports = { getArticles, getArticleById, patchArticleById };
