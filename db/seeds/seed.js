const db = require('../connection');
const format = require('pg-format');
const { convertTimestampToDate, getArticleId } = require('../seeds/utils');

const seed = async ({ topicData, userData, articleData, commentData }) => {
  try {
    // ----- DROP TABLES
    await db.query(`DROP TABLE IF EXISTS comments`);
    await db.query(`DROP TABLE IF EXISTS articles`);
    await db.query(`DROP TABLE IF EXISTS users`);
    await db.query(`DROP TABLE IF EXISTS topics`);

    // ----- CREATE TABLES

    // topics
    await db.query(
      `CREATE TABLE IF NOT EXISTS topics (slug VARCHAR(80) PRIMARY KEY NOT NULL, description VARCHAR(400), img_url VARCHAR(1000))`
    );

    // users
    await db.query(
      `CREATE TABLE IF NOT EXISTS users (username VARCHAR PRIMARY KEY NOT NULL, name VARCHAR(100), avatar_url VARCHAR(1000))`
    );

    // articles
    await db.query(
      `CREATE TABLE IF NOT EXISTS articles (article_id SERIAL PRIMARY KEY, title VARCHAR(100), topic VARCHAR(100) REFERENCES topics(slug), author VARCHAR(80) REFERENCES users(username), body TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, votes INT DEFAULT 0, article_img_url VARCHAR(1000))`
    );

    // comments
    await db.query(
      `CREATE TABLE IF NOT EXISTS comments (comment_id SERIAL PRIMARY KEY, article_ID INT REFERENCES articles(article_id), body TEXT, votes INT DEFAULT 0, author VARCHAR(100) REFERENCES users(username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )`
    );

    // ----- INSERT DATA

    // topics
    const formattedTopics = topicData.map(({ description, slug, img_url }) => {
      return [slug, description, img_url];
    });
    // console.log(formattedTopics);

    const sqlStringInsertTopics = format(
      `INSERT INTO topics (slug, description, img_url) VALUES %L`,
      formattedTopics
    );
    await db.query(sqlStringInsertTopics);

    // users
    // console.log({ userData });
    const formattedUsers = userData.map(({ username, name, avatar_url }) => {
      return [username, name, avatar_url];
    });
    // console.log(formattedUsers);
    const sqlStringUserData = format(
      `INSERT INTO users (username, name, avatar_url) VALUES %L`,
      formattedUsers
    );
    await db.query(sqlStringUserData);

    // articles
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
    console.log(formattedArticles);
    const sqlStringArticleData = format(
      `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L`,
      formattedArticles
    );
    await db.query(sqlStringArticleData);

    // comments
    const formattedComments = commentData.map((article) => {
      
      const convertedCommentWithID = getArticleId(article);

      // convert to new object with timestamp
      const convertedComments = convertTimestampToDate(convertedCommentWithID);

      // need util function to compare article title in comments object -> article title in article data and return ID
      return [
        convertedComments.article_id,
        convertedCommentWithID.body,
        convertedCommentWithID.votes,
        convertedCommentWithID.author,
        convertedCommentWithID.created_at,

      ]
      
    });
    // console.log(formattedComments);
    const sqlStringComments = format(`INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L`, formattedComments);
    await db.query(sqlStringComments);
  } catch (err) {
    throw err;
  }
};
module.exports = seed;
