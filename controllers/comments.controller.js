// comments controller.js
const { fetchCommentsById } = require('../models/index.models');

const getCommentsByArticleId = async (req, res) => {
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

module.exports = getCommentsByArticleId;
