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
    //invalid id
    if (isNaN(article_id)) {
      return Promise.reject({status: 400, msg : 'invalid id'
      })
    } 
    const articles = await fetchArticleById(article_id);
    //db error or non-existent article id
    if (!isNaN(article_id) && articles.length === 0) {
      return Promise.reject({status: 404, msg : 'article not found'
      })
    }
    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};

module.exports = { getArticles, getArticleById };
