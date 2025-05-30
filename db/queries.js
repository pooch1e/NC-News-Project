// queries to test DB
const db = require('./connection');

// Get all of the users
// db.query(`SELECT username FROM users`)
//   .then(({ rows }) => {
//     console.log(rows);
//   })
//   .catch((err) => {
//     return err;
//   });

// Get all of the articles where the topic is coding
// db.query(
//   `SELECT articles, topics FROM articles JOIN topics ON articles.topic = topics.slug WHERE topics.slug = 'coding'`
// )
//   .then(({ rows }) => {
//     console.log(rows);
//   })
//   .catch((err) => {
//     return err;
//   });

// Get all of the comments where the votes are less than zero
// db.query(`SELECT article_id, body FROM comments WHERE votes < 0`)
//   .then(({ rows }) => {
//     console.log(rows);
//   })
//   .catch((err) => {
//     return err;
//   });

// Get all of the topics
// db.query('SELECT topic FROM articles')
//   .then(({ rows }) => {
//     console.log(rows);
//   })
//   .catch((err) => {
//     return err;
//   });

// Get all of the articles by user grumpy19
// db.query(`SELECT articles.body FROM articles WHERE author = 'grumpy19'`)
//   .then(({ rows }) => {
//     console.log(rows);
//   })
//   .catch((err) => {
//     return err;
//   });

// Get all of the comments that have more than 10 votes.

db.query(`SELECT * FROM comments WHERE votes > 10`)
  .then(({ rows }) => {
    console.log(rows);
  })
  .catch((err) => {
    return err;
  });
