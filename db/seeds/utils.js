const db = require('../../db/connection');
const format = require('pg-format');

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

//!possibly remove
exports.getArticleId = async ({ article_title, ...other_properties }) => {
  try {
    // placeholder
    // const article_Id = 1;

    const result = await db.query(
      `SELECT article_id FROM articles WHERE title = $1`,
      [article_title]
    );
    const article_id = result.rows[0].article_id;

    return { article_title, article_id, ...other_properties };
  } catch (err) {
    console.log('article undefined');
    throw err;
  }
};

exports.getValueFromKey = (arr, key, value) => {
  if (arr.length === 0) return {};

  return arr.reduce((acc, curr) => {
    acc[curr[key]] = curr[value];
    return acc;
  }, {});
};

exports.checkExists = async (table, column, value) => {
  const queryStr = format('SELECT * FROM %I WHERE %I = $1;', table, column);
  const dbOutput = await db.query(queryStr, [value]);
  if (dbOutput.rows.length === 0) {
    // resource does NOT exist
    return Promise.reject({ status: 404, msg: 'Resource not found' });
  }
};
