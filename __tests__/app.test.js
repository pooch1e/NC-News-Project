const endpointsJson = require('../endpoints.json');

const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data');
const request = require('supertest');
const app = require('../app');
const { toBeSortedBy } = require('jest-sorted');

/* Set up your test imports here */

beforeEach(() => {
  return seed(data);
});


describe('ERROR Invalid route', () => {
  test('404 - Responds with route not found when url is invalid', () => {
    return request(app)
      .get('/api/invalid')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Route not found');
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

describe('GET api/articles/:article_id', () => {
  test('200: Responds with an object with the key of article and the value of an article object', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({ body }) => {
        const { article } = body;

        expect(typeof article.article_id).toBe('number');
        expect(typeof article.title).toBe('string');
        expect(typeof article.topic).toBe('string');
        expect(typeof article.author).toBe('string');
        expect(typeof article.body).toBe('string');
        expect(typeof article.created_at).toBe('string');
        expect(typeof article.votes).toBe('number');
        expect(typeof article.article_img_url).toBe('string');
        expect(typeof article.comment_count).toBe('number');
      });
  });
});

describe('Errors: /api/articles', () => {
  test('400: Responds with error message for invalid article type', () => {
    return request(app)
      .get('/api/articles/notanum')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid id');
      });
  });
  test('400: Responds with invalid id for PG bad type (POSTGRES)', () => {
    return request(app)
      .get('/api/articles/dog123')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid id');
      });
  });
  test('404: Responds with error message for non existent article id in database', () => {
    return request(app)
      .get('/api/articles/999999')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Id not found');
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
        const { article } = body;

        expect(typeof article.article_id).toBe('number');
        expect(typeof article.title).toBe('string');
        expect(typeof article.topic).toBe('string');
        expect(typeof article.author).toBe('string');
        expect(typeof article.body).toBe('string');
        expect(typeof article.created_at).toBe('string');
        expect(typeof article.votes).toBe('number');
        expect(typeof article.article_img_url).toBe('string');
        expect(typeof article.comment_count).toBe('number');
      });
  });
});

describe('Errors: /api/articles', () => {
  test('400: Responds with error message for invalid article type', () => {
    return request(app)
      .get('/api/articles/notanum')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid id');
      });
  });
  test('400: Responds with invalid id for PG bad type (POSTGRES)', () => {
    return request(app)
      .get('/api/articles/dog123')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid id');
      });
  });
  test('404: Responds with error message for non existent article id in database', () => {
    return request(app)
      .get('/api/articles/999999')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Id not found');
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
  test('200: Returns empty array when article exists but has no comments', () => {
    return request(app)
      .get('/api/articles/10/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
});

describe('Errors: GET /api/articles/:articleid/comments', () => {
  describe('tests for PG errors', () => {
    test('400: Responds with error for invalid article id format', () => {
      return request(app)
        .get('/api/articles/notanum/comments')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Invalid id');
        });
    });
    test('404: Responds with error for blank article id', () => {
      return request(app)
        .get('/api/articles/%20/comments')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Resource not found');
        });
    });
    test('404: Responds with error message for non existent comment id in database', () => {
      return request(app)
        .get('/api/articles/99999/comments')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Resource not found');
        });
    });
  });
});

describe('POST /api/articles', () => {
  test('201: Adds a new article and responds with obj of new article with correct properties', () => {
    const newArticle = {
      title: 'My new article',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'this is my new article, check it out',
      article_img_url: 'www.ashasjhdha.com',
    };
    return request(app)
      .post('/api/articles')
      .send(newArticle)
      .expect(201)
      .then(({ body }) => {
        const { newArticle } = body;
        expect(typeof newArticle.author).toBe('string');
        expect(typeof newArticle.title).toBe('string');
        expect(typeof newArticle.body).toBe('string');
        expect(typeof newArticle.topic).toBe('string');
        expect(typeof newArticle.article_img_url).toBe('string');
        expect(typeof newArticle.article_id).toBe('number');
        expect(typeof newArticle.created_at).toBe('string');
        expect(typeof newArticle.comment_count).toBe('number');
      });
  });
});

describe('ERRORS POST /api/articles', () => {
  test('400: missing required fields', () => {
    const errorObj = { title: 'only one here' };
    return request(app)
      .post('/api/articles')
      .send(errorObj)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid fields');
      });
  });
  test('404: Author does not exist', () => {
    const errorArticle = {
      title: 'not an article',
      body: 'woo woo!',
      author: 'nonexistent_user',
      topic: 'mitch',
    };
    return request(app)
      .post('/api/articles')
      .send(errorArticle)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('User not found');
      });
  });
  test('404: Topic does not exist', () => {
    const errorArticle = {
      title: 'not an article',
      body: 'woo woo!',
      author: 'mitch',
      topic: 'foosball',
    };
    return request(app)
      .post('/api/articles')
      .send(errorArticle)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Topic not found');
      });
  });
});

describe('POST /api/articles/:article_id/comments', () => {
  test('201: Posting a valid comment returns 201 with the created comment', () => {
    const newComment = { username: 'butter_bridge', body: 'i like thumbs' };
    return request(app)
      .post('/api/articles/1/comments')
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { postedComment } = body;

        expect(typeof postedComment.author).toBe('string');
        expect(typeof postedComment.body).toBe('string');
        expect(postedComment.author).toBe(newComment.username);
        expect(postedComment.body).toBe(newComment.body);
      });
  });
});

describe('ERRORS POST /api/articles/:article_id/comments', () => {
  test('400: Responds with FK error if no author exists', () => {
    const invalidComment = {
      username: 'eric cartman',
      body: 'Invalid body, I do not exist',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(invalidComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Resource not found');
      });
  });
  test('404: Responds with bad request if post contains valid article id that does not exist ', () => {
    const invalidComment = { username: 'butter_bridge', body: 'i like thumbs' };

    return request(app)
      .post('/api/articles/1000/comments')
      .send(invalidComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Resource not found');
      });
  });
  test('400: Responds with Bad Request for invalid article_id (non-numeric)', () => {
    const invalidComment = {
      username: 'butter_bridge',
      body: 'This is a comment on a non-numeric article_id',
    };

    return request(app)
      .post('/api/articles/not-a-valid-id/comments')
      .send(invalidComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid type');
      });
  });
});

describe('PATCH /api/articles/:article_id', () => {
  test('200 : Responds with the updated article', () => {
    const newVotes = { inc_votes: 1 };
    return request(app)
      .patch('/api/articles/1')
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        const { updatedArticle } = body;
        expect(typeof updatedArticle.article_id).toBe('number');
        expect(typeof updatedArticle.title).toBe('string');
        expect(typeof updatedArticle.topic).toBe('string');
        expect(typeof updatedArticle.author).toBe('string');
        expect(typeof updatedArticle.body).toBe('string');
        expect(typeof updatedArticle.created_at).toBe('string');
        expect(typeof updatedArticle.votes).toBe('number');
        expect(typeof updatedArticle.article_img_url).toBe('string');

        expect(updatedArticle.votes).toBe(101);
      });
  });
  test('200 : Responds with the updated article when passed negative votes', () => {
    const newNegVotes = { inc_votes: -100 };
    return request(app)
      .patch('/api/articles/2')
      .send(newNegVotes)
      .expect(200)
      .then(({ body }) => {
        const { updatedArticle } = body;
        expect(typeof updatedArticle.article_id).toBe('number');
        expect(typeof updatedArticle.title).toBe('string');
        expect(typeof updatedArticle.topic).toBe('string');
        expect(typeof updatedArticle.author).toBe('string');
        expect(typeof updatedArticle.body).toBe('string');
        expect(typeof updatedArticle.created_at).toBe('string');
        expect(typeof updatedArticle.votes).toBe('number');
        expect(typeof updatedArticle.article_img_url).toBe('string');

        expect(updatedArticle.votes).toBe(-100);
      });
  });
});

describe('ERROR PATCH /api/articles/:article_id', () => {
  test('404: Responds with error message for non existent article id in database', () => {
    return request(app)
      .patch('/api/articles/99999')
      .send({ inc_votes: 1 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Article not found');
      });
  });
});

describe('DELETE /api/comments/:comment_id', () => {
  test('204: Responds with a status 204 and no response', () => {
    return request(app)
      .delete('/api/comments/1')
      .expect(204)
      .then(() => {
        return request(app)
          .get('/api/comments/1')
          .expect(404)
          .then(({ body }) => expect(body.msg).toBe('Route not found'));
      });
  });
});

describe('ERRORS DELETE /api/comments/:comment_id', () => {
  test('400: Invalid comment id', () => {
    return request(app)
      .delete('/api/comments/notanum')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid ID');
      });
  });
  test('404: Comment not found', () => {
    return request(app)
      .delete('/api/comments/999999')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('comment not found');
      });
  });
});

describe('PATCH /api/comments/:comment_id', () => {
  test('200: Updates given vote count on comment id and responds with updated comment', () => {
    const newVotes = { inc_votes: 1 };
    return request(app)
      .patch('/api/comments/1')
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        const { comment } = body;

        expect(typeof comment.comment_id).toBe('number');
        expect(typeof comment.article_id).toBe('number');
        expect(typeof comment.body).toBe('string');
        expect(typeof comment.votes).toBe('number');
        expect(typeof comment.author).toBe('string');
        expect(typeof comment.created_at).toBe('string');
        expect(comment.votes).toBe(17);
      });
  });

  describe('ERROR PATCH /api/comments/:comment_id', () => {
    test('404: Responds with error message for non existent comment id in database', () => {
      return request(app)
        .patch('/api/comments/99999')
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Comment not found');
        });
    });
    test('400: Responds with error message when inc_votes body is missing', () => {
      return request(app)
        .patch('/api/comments/2')
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Missing required field: inc_votes');
        });
    });
    test('400: Responds with error message when inc_votes body is invalid', () => {
      return request(app)
        .patch('/api/comments/2')
        .send({ inc_votes: 'banana' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Invalid type');
        });
    });
  });

  test('200: Updates given vote count on comment id when passed negative votes and responds with updated comment', () => {
    const newVotes = { inc_votes: -100 };
    return request(app)
      .patch('/api/comments/1')
      .send(newVotes)
      .expect(200)
      .then(({ body }) => {
        const { comment } = body;

        expect(typeof comment.comment_id).toBe('number');
        expect(typeof comment.article_id).toBe('number');
        expect(typeof comment.body).toBe('string');
        expect(typeof comment.votes).toBe('number');
        expect(typeof comment.author).toBe('string');
        expect(typeof comment.created_at).toBe('string');
        expect(comment.votes).toBe(-84);
      });
  });
});

describe('GET /api/articles (sorting queries)', () => {
  describe('sort_by (defaults to descending', () => {
    test('200 : sorts articles by (defaults to) created_at', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy('created_at', { descending: 'true' });
        });
    });
    test('200 : sorts articles by votes', () => {
      return request(app)
        .get('/api/articles?sort_by=votes')
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy('votes', { descending: 'true' });
        });
    });
  });
  describe('order : sorts in asc or desc (defaults desc)', () => {
    test('sorts column in desc order (default)', () => {
      return request(app)
        .get('/api/articles?sort_by=author')
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy('author', { descending: 'true' });
        });
    });
    test('sorts column ascending order', () => {
      return request(app)
        .get('/api/articles?order_by=asc')
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy('', { ascending: 'true' });
        });
    });
  });
  describe('combined sort and order', () => {
    test('sorts articles by title in ascending order', () => {
      return request(app)
        .get('/api/articles?sort_by=title&order=asc')
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy('title', { ascending: 'true' });
        });
    });
  });
});

describe('ERRORS GET /api/articles (sorting queries)', () => {
  test('400: Bad request, invalid sort_by query', () => {
    return request(app)
      .get('/api/articles?sort_by=banana')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid sort_by query');
      });
  });
  test('400: Bad request, invalid order query', () => {
    return request(app)
      .get('/api/articles?order=banana')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid order query');
      });
  });
});

describe('GET /api/articles (topic queries)', () => {
  describe('sorts articles by topic, defaults to all articles if no topic provided', () => {
    test('when queried with a topic, returns all articles with that topic', () => {
      return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).not.toBe(0);
          articles.forEach((article) => {
            expect(typeof article.topic).toBe('string');
            expect(article.topic).toBe('mitch');
          });
        });
    });
    test('when queried with a valid topic, returns empty array if there are no articles', () => {
      return request(app)
        .get('/api/articles?topic=paper')
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(0);
        });
    });
  });
});

describe('ERRORS GET /api/articles (topics)', () => {
  test('404: Bad request, invalid topic query - not in database', () => {
    return request(app)
      .get('/api/articles?topic=banana')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Resource not found');
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

describe('GET api/articles (pagination)', () => {
  describe('paginated articles, limit and page', () => {
    test('defaults to 10 pages', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(10);
        });
    });
  });
  test('returns a limited number of articles', () => {
    return request(app)
      .get('/api/articles?limit=5')
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).toBe(5);
      });
  });
  test('returns correct amount of pages', () => {
    return request(app)
      .get('/api/articles?p=2')
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).toBe(3);
      });
  });
});

describe('ERRORS for api/articles (pagination)', () => {
  test('Invalid pagination query', () => {
    return request(app)
      .get('/api/articles?limit=abc&p=24')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid page query');
      });
  });
});

describe('GET /api/users/:username', () => {
  test('200: Responds with a user object from username', () => {
    return request(app)
      .get('/api/users/icellusedkars')
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(typeof user.username).toBe('string');
        expect(typeof user.name).toBe('string');
        expect(typeof user.avatar_url).toBe('string');
      });
  });
});

describe('ERRORS /api/user/:username', () => {
  test('404: User not found', () => {
    return request(app)
      .get('/api/users/dingus')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid username');
      });
  });
});

afterAll(() => {
  return db.end();
});
