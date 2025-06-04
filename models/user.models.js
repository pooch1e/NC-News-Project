const db = require('../db/connection');

const fetchUser = () => {
  // console.log('hello from user model');
  return db.query(`SELECT * FROM users`).then(({rows}) => {
    return rows;
  })
};

module.exports = fetchUser;
