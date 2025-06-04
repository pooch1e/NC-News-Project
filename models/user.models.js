const db = require('../db/connection');

const fetchUser = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};

module.exports = fetchUser;
