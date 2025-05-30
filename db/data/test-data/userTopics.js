// test seed-data for user_topics
// ! cols user_topic_id PK
// ! username FK
// ! topic FK

const user_topics = [
  { username: 'butter_bridge', topic: 'mitch' },
  { username: 'icellusedkars', topic: 'cats' },
  { username: 'rogersop', topic: 'paper' },
  { username: 'lurker', topic: 'mitch' },
  { username: 'butter_bridge', topic: 'paper' },
  { username: 'icellusedkars', topic: 'mitch' },
  { username: 'lurker', topic: 'cats' },
  { username: 'rogersop', topic: 'mitch' },
];

module.exports = user_topics;
