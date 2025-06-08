const db = require('../db/connection');

const fetchUser = async () => {
  const { rows } = await db.query(`SELECT * FROM users`);
  return rows;
};

const fetchUserByUsername = async (username) => {
  
  try {
    const { rows } = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    const user = rows[0];
    return user || null;
  } catch (err) {
    throw err;
  }
};

module.exports = { fetchUser, fetchUserByUsername };
