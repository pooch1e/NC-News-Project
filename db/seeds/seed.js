const db = require('../connection');
const format = require('pg-format');
const {
  convertTimestampToDate,
  getArticleId,
  getValueFromKey,
} = require('../seeds/utils');

const seed = async ({ topicData, userData, articleData, commentData }) => {
  try {
    // ----- DROP TABLES
    await db.query(`DROP TABLE IF EXISTS comments`);
    await db.query(`DROP TABLE IF EXISTS user_topics`);
    await db.query(`DROP TABLE IF EXISTS articles`);
    await db.query(`DROP TABLE IF EXISTS users`);
    await db.query(`DROP TABLE IF EXISTS topics`);

    // ----- CREATE TABLES

    // Topics
    await db.query(
      `CREATE TABLE IF NOT EXISTS topics (slug VARCHAR(80) PRIMARY KEY NOT NULL, description VARCHAR(400), img_url VARCHAR(1000))`
    );

    // Users
    await db.query(
      `CREATE TABLE IF NOT EXISTS users (username VARCHAR PRIMARY KEY NOT NULL, name VARCHAR(100), avatar_url VARCHAR(1000))`
    );

    //User_Topics_Junction
    await db.query(
      `CREATE TABLE IF NOT EXISTS user_topics (user_topics_id SERIAL PRIMARY KEY NOT NULL, username VARCHAR REFERENCES users(username) ON DELETE CASCADE, topic VARCHAR REFERENCES topics(slug) ON DELETE CASCADE, UNIQUE (username, topic))`
    );

    // Articles
    await db.query(
      `CREATE TABLE IF NOT EXISTS articles (article_id SERIAL PRIMARY KEY, title VARCHAR(100), topic VARCHAR(100) REFERENCES topics(slug), author VARCHAR(80) REFERENCES users(username), body TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, votes INT DEFAULT 0, article_img_url VARCHAR(1000))`
    );

    // Comments
    await db.query(
      `CREATE TABLE IF NOT EXISTS comments (comment_id SERIAL PRIMARY KEY, article_ID INT REFERENCES articles(article_id), body TEXT, votes INT DEFAULT 0, author VARCHAR(100) REFERENCES users(username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )`
    );

    // ----- INSERT DATA

    // Topics
    const formattedTopics = topicData.map(({ description, slug, img_url }) => {
      return [slug, description, img_url];
    });

    const sqlStringInsertTopics = format(
      `INSERT INTO topics (slug, description, img_url) VALUES %L`,
      formattedTopics
    );
    await db.query(sqlStringInsertTopics);

    // Users
    const formattedUsers = userData.map(({ username, name, avatar_url }) => {
      return [username, name, avatar_url];
    });

    const sqlStringUserData = format(
      `INSERT INTO users (username, name, avatar_url) VALUES %L`,
      formattedUsers
    );
    await db.query(sqlStringUserData);

    // User Topics

    // Articles
    const formattedArticles = articleData.map((article) => {
      const converted = convertTimestampToDate(article);
      return [
        converted.title,
        converted.topic,
        converted.author,
        converted.body,
        converted.created_at,
        converted.votes,
        converted.article_img_url,
      ];
    });
    
    const sqlStringArticleData = format(
      `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
      formattedArticles
    );
    const returnedArticles = await db.query(sqlStringArticleData);

    // Comments

    //! CREATE look up object from Articles
    const returnedArticle_id = getValueFromKey(
      returnedArticles.rows,
      'title',
      'article_id'
    );

    const formattedComments = commentData.map(
      ({ article_title, body, votes, author, created_at }) => {
        // Correct Timestamp
        const convertedTimestamp = convertTimestampToDate({
          article_title,
          body,
          votes,
          author,
          created_at,
        });

        // Use Look Up Object
        const getArticleId = returnedArticle_id[article_title];
        
        return [
          getArticleId,
          convertedTimestamp.body,
          convertedTimestamp.votes,
          convertedTimestamp.author,
          convertedTimestamp.created_at,
        ];
      }
    );

    const sqlStringComments = format(
      `INSERT INTO comments (article_ID, body, votes, author, created_at) VALUES %L`,
      formattedComments
    );
    await db.query(sqlStringComments);
  } catch (err) {
    throw err;
  }
};
module.exports = seed;
