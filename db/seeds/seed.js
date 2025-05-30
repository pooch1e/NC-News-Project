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
    // user topics?
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

    //user topics?

    // comments
    await db.query(
      `CREATE TABLE IF NOT EXISTS comments (comment_id SERIAL PRIMARY KEY, article_ID INT REFERENCES articles(article_id), body TEXT, votes INT DEFAULT 0, author VARCHAR(100) REFERENCES users(username), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )`
    );

    // ----- INSERT DATA

    // topics
    const formattedTopics = topicData.map(({ description, slug, img_url }) => {
      return [slug, description, img_url];
    });

    const sqlStringInsertTopics = format(
      `INSERT INTO topics (slug, description, img_url) VALUES %L`,
      formattedTopics
    );
    await db.query(sqlStringInsertTopics);

    // users
    const formattedUsers = userData.map(({ username, name, avatar_url }) => {
      return [username, name, avatar_url];
    });

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
    // console.log(formattedArticles, 'articles');
    const sqlStringArticleData = format(
      `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
      formattedArticles
    );
    const returnedArticles = await db.query(sqlStringArticleData);

    // console.log(returnedArticles);
    // comments

    //! CREATE look up object from Articles
    const returnedArticle_id = getValueFromKey(returnedArticles.rows, 'title', 'article_id');

    const formattedComments = commentData.map(({ article_title, body, votes, author, created_at }) => {
      // correct Timestamp
      const convertedTimestamp = convertTimestampToDate({ article_title, body, votes, author, created_at })

      // use Look Up Object
      const getArticleId = returnedArticle_id[article_title]
      // console.log(getArticleId, 'this is the article id object');
      return [
        getArticleId,
        convertedTimestamp.body,
        convertedTimestamp.votes,
        convertedTimestamp.author,
        convertedTimestamp.created_at
        
      ];
    });

    const sqlStringComments = format(
      `INSERT INTO comments (article_ID, body, votes, author, created_at) VALUES %L`,
      formattedComments
    );
    await db.query(sqlStringComments);

    // console.log(formattedComments);

    // const formattedComments = await Promise.all(
    //   commentData.map(async (comment) => {
    //     // retreive article_ID
    //     const convertedCommentWithID = await getArticleId(comment);

    //     // convert to new object with timestamp
    //     const convertedComments = convertTimestampToDate(
    //       convertedCommentWithID
    //     );
    //     // console.log(convertedComments);
    //     return [
    //       convertedComments.article_id,
    //       convertedComments.body,
    //       convertedComments.votes,
    //       convertedComments.author,
    //       convertedComments.created_at,
    //     ];
    //   })
    // );
    // console.log(formattedComments);
    
  } catch (err) {
    throw err;
  }
};
module.exports = seed;
