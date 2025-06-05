const endpointsJson = require('../endpoints.json');

const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data');
const request = require('supertest');
const app = require('../app');

/* Set up your test imports here */

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe('GET /api', () => {
  test('200: Responds with an object detailing the documentation for each endpoint', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        const { endpoints } = body;
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe('Invalid route', () => {
  test('404 - Responds with route not found when url is invalid', () => {
    return request(app)
      .get('/api/invalid')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('route not found');
      });
  });
});

describe('GET api/topics', () => {
  test('200: Responds with an object detailing all topics', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics.length).not.toBe(0);
        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe('string');
          expect(typeof topic.description).toBe('string');
        });
      });
  });
});

describe('GET api/articles', () => {
  test('200: Responds with an object with the key of articles and the value of an array of article objects', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).not.toBe(0);

        articles.forEach((article) => {
          expect(typeof article.article_id).toBe('number');
          expect(typeof article.title).toBe('string');
          expect(typeof article.topic).toBe('string');
          expect(typeof article.author).toBe('string');
          expect(typeof article.created_at).toBe('string');
          expect(typeof article.votes).toBe('number');
          expect(typeof article.article_img_url).toBe('string');
          expect(typeof article.comment_count).toBe('number');
        });
      });
  });
});

describe('GET api/article/:article_id', () => {
  test('200: Responds with an object with the key of article and the value of an article object', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).not.toBe(0);
        articles.forEach((article) => {
          expect(typeof article.article_id).toBe('number');
          expect(typeof article.title).toBe('string');
          expect(typeof article.topic).toBe('string');
          expect(typeof article.author).toBe('string');
          expect(typeof article.body).toBe('string');
          expect(typeof article.created_at).toBe('string');
          expect(typeof article.votes).toBe('number');
          expect(typeof article.article_img_url).toBe('string');
        });
      });
  });
});

describe('GET api/articles/:article_id/comments', () => {
  test('200: Responds with an object with the key of comments and the value of an array of comments for the given article_id', () => {
    return request(app)
      .get('/api/articles/5/comments')
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;

        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe('number');
          expect(typeof comment.article_id).toBe('number');
          expect(typeof comment.body).toBe('string');
          expect(typeof comment.votes).toBe('number');
          expect(typeof comment.author).toBe('string');
          expect(typeof comment.created_at).toBe('string');
        });
      });
  });
});

describe('Errors: /api/articles/:articleid/comments', () => {
  describe('tests for PG errors', () => {
    test('400: Responds with error for invalid article id format', () => {
      return request(app)
        .get('/api/articles/notanum/comments')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('invalid id');
        });
    });
    test('404: Responds with error for blank article id', () => {
      return request(app)
      .get('/api/articles/%20/comments')
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('id not found')
      })
    })
    test('404: Responds with error message for non existent comment id in database', () => {
      return request(app)
        .get('/api/articles/99999/comments')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('id not found');
        });
    });
    test('404: Responds with error message for existing comment but empty id in database', () => {
      return request(app)
        .get('/api/articles/2/comments')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('id not found');
        });
    });
  });
});

// Testing /api/article for errors
describe('Errors: /api/articles', () => {
  test('400: Responds with error message for invalid article type', () => {
    return request(app)
      .get('/api/articles/notanum')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('invalid id');
      });
  });
  test('400: Responds with invalid id for PG bad type (POSTGRES)', () => {
    return request(app)
      .get('/api/articles/dog123')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('invalid id');
      });
  });
  test('404: Responds with error message for non existent article id in database', () => {
    return request(app)
      .get('/api/articles/999999')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('id not found');
      });
  });
});

describe('GET api/users', () => {
  test('200: Responds with an object with the key of users and the value of an array of objects', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users.length).not.toBe(0);

        users.forEach((user) => {
          expect(typeof user.username).toBe('string');
          expect(typeof user.name).toBe('string');
          expect(typeof user.avatar_url).toBe('string');
        });
      });
  });
});
