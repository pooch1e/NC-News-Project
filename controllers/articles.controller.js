//articles.controller
const { sort } = require('../db/data/test-data/articles');
const {
  fetchArticles,
  fetchArticleById,
  updateArticleById,
} = require('../models/index.models');

const getArticles = async (req, res, next) => {
  const { sort_by, order } = req.query;

  // console.log(sort_by, order, topic)
  // console.log(req.query, 'query obj')

  try {
    const articles = await fetchArticles({ sort_by, order });
    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};

const getArticleById = async (req, res, next) => {
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

const patchArticleById = async (req, res, next) => {
  const { article_id } = req.params;

  if (Object.keys(req.body).length === 0) {
    return Promise.reject({
      status: 400,
      msg: 'Missing required field: inc_votes',
    });
  }
  const { inc_votes } = req.body; //typeof number

  try {
    const patchedArticle = await updateArticleById(inc_votes, article_id);
    res.status(200).send({ updatedArticle: patchedArticle });
  } catch (err) {
    next(err);
  }
};

module.exports = { getArticles, getArticleById, patchArticleById };
