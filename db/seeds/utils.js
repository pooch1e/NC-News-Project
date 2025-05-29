const db = require('../../db/connection');

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

// UTIL FUNCTION TO COMPARE OBJECT TO DATA AND RETURN CORRECT ID

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
