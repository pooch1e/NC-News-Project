// test seed data for user_votes table

const userArticleVotes = [
  { username: 'butter_bridge', article_id: 1, vote_count: 1 },
  { username: 'icellusedkars', article_id: 2, vote_count: -1 },
  { username: 'rogersop', article_id: 3, vote_count: 1 },
  { username: 'lurker', article_id: 1, vote_count: 1 },
  { username: 'butter_bridge', article_id: 2, vote_count: 1 },
  { username: 'icellusedkars', article_id: 3, vote_count: 1 },
  { username: 'rogersop', article_id: 1, vote_count: -1 },
  { username: 'lurker', article_id: 2, vote_count: 1 },
  { username: 'butter_bridge', article_id: 3, vote_count: 1 },
  { username: 'icellusedkars', article_id: 1, vote_count: 1 },
  { username: 'rogersop', article_id: 2, vote_count: 1 },
  { username: 'lurker', article_id: 3, vote_count: -1 },
];

module.exports = userArticleVotes;
