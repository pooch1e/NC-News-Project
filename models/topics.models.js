// topics.models.js
const db = require('../db/connection');

const fetchTopics = async () => {
  const { rows } = await db.query(`SELECT slug, description FROM topics;`);
  return rows;
};

module.exports = fetchTopics;
