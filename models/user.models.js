const db = require('../db/connection');

const fetchUser = async () => {
  const { rows } = await db.query(`SELECT * FROM users`);
  return rows;
};

module.exports = fetchUser;
