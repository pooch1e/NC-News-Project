//articles.controller
const {
  fetchArticles,
  fetchArticleById,
  updateArticleById,
  postNewArticle,
} = require('../models/index.models');

const getArticles = async (req, res, next) => {
  const { sort_by, order, topic, limit, p } = req.query;

  try {
    const articles = await fetchArticles({ sort_by, order, topic, limit, p });
    const articleWithNoBody = articles.map(({ body, ...rest }) => {
      return { ...rest };
    });
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
      return Promise.reject({ status: 400, msg: 'Invalid id' });
    }
    const article = await fetchArticleById(article_id);
    //db error or non-existent article id
    if (!article) {
      return Promise.reject({ status: 404, msg: 'Id not found' });
    }
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

const patchArticleById = async (req, res, next) => {
  const { article_id } = req.params;

  const { inc_votes } = req.body; //typeof number

  try {
    if (Object.keys(req.body).length === 0) {
      const article = await fetchArticleById(article_id)
      if (!article) {
        return Promise.reject({status : 400, msg: "Article does not exist"})
      } else {
        res.status(200).send({article})
      }
    }
    const patchedArticle = await updateArticleById(inc_votes, article_id);
    res.status(200).send({ updatedArticle: patchedArticle });
  } catch (err) {
    next(err);
  }
};

const postArticle = async (req, res, next) => {
  const { title, body, author, topic } = req.body;
  let { article_img_url } = req.body;

  if (!article_img_url) {
    article_img_url = 'www.default.com/jpg';
  }

  // if fields invalid
  if (!title || !body || !author || !topic) {
    return Promise.reject({ status: 400, msg: 'Invalid fields' });
  }

  try {
    const newArticle = await postNewArticle({
      title,
      topic,
      author,
      body,
      article_img_url,
    });

    res.status(201).send({ newArticle });
  } catch (err) {
    if (err.code === '23503') {
      if (err.constraint === 'articles_topic_fkey') {
        return Promise.reject({ status: 404, msg: 'Topic not found' });
      } else {
        return Promise.reject({ status: 404, msg: 'User not found' });
      }
    }
    next(err);
  }
};

module.exports = { getArticles, getArticleById, patchArticleById, postArticle };
