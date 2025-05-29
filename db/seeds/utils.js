const db = require('../../db/connection');

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

// UTIL FUNCTION TO COMPARE OBJECT TO DATA AND RETURN CORRECT ID

//For each comment, finds the corresponding articles ID so I can insert the correct foreign ID into the comment table

//what is my input?
exports.getArticleId = async ({ article_title, ...other_properties }) => {
  try {
    // placeholder
    // const article_Id = 1;

    // passing in the article title
    const result = await db.query(
      `SELECT article_id FROM articles WHERE title = $1`,
      [article_title]
    );
    const article_id = result.rows[0].article_id;

    return { article_title, article_id, ...other_properties };
    // select article that has same tile and return ID

    // use same logic as above to create new object?

    // return object?
  } catch (err) {
    console.log('article undefined')
    throw err;
  }
};
