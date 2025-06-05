// comments controller.js
const {
  fetchCommentsById,
  insertCommentByArticleId,
  fetchArticleById,
} = require('../models/index.models');

const getCommentsByArticleId = async (req, res) => {
  if (req.params.article_id === '') {
    return res.status(400).send({ status: 400, msg: 'invalid type' });
  }
  const article_id = Number(req.params.article_id);

  try {
    if (isNaN(article_id)) {
      return Promise.reject({ status: 400, msg: 'invalid id' });
    }

    const comments = await fetchCommentsById(article_id);
    //db error or non-existent article id
    if (!isNaN(article_id) && comments.length === 0) {
      return Promise.reject({ status: 404, msg: 'id not found' });
    }
    res.status(200).send({ comments });
  } catch (err) {
    if (err.message === 'id not found') {
      res.status(404).send({ msg: err.message });
    }
  }
};

const postCommentByArticleId = async (req, res) => {
  // console.log('hello from post comment')
  const { username, body } = req.body;
  const { article_id } = req.params;

  try {
    const postedComment = await insertCommentByArticleId(
      article_id,
      username,
      body
    );

    res.status(201).send({ postedComment });
  } catch (err) {
    if (err.code === '23503') {
      // Foreign key violation
      return Promise.reject({ status: 400, msg: 'Username does not exist' });
    }
  }
};

module.exports = { getCommentsByArticleId, postCommentByArticleId };
