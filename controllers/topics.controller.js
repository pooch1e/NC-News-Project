//topics controller
const fetchTopics = require('../models/topics.models');

const getTopics = async (req, res) => {
  try {
    const topics = await fetchTopics();
    res.status(200).send({ topics });
  } catch (err) {
    console.log(err);
  }
};

module.exports = getTopics;
