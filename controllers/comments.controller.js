// comments controller.js
const { fetchCommentsById } = require('../models/index.models');

const getCommentsByArticleId = async (req, res) => {
  const article_id = Number(req.params.article_id);
  // console.log(article_id, 'inside controller')
  // console.log('inside getcomments controller') //passing this
  try {
    const comments = await fetchCommentsById(article_id);
    res.status(200).send({ comments });
  } catch (err) {
    if (err.message === 'No comments for this id') {
      res.status(404).send({msg : err.message})
    }
    
  }
};

module.exports = getCommentsByArticleId;
