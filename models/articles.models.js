//articles.models.js
const db = require('../db/connection');

const fetchArticles = () => {
  console.log('hello from articles models');
  return db.query(`SELECT * FROM articles`).then(({ rows }) => {
    console.log(rows);
    return rows;
  });
};

module.exports = {fetchArticles};
