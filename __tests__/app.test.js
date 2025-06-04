const endpointsJson = require("../endpoints.json");

const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");


/* Set up your test imports here */

beforeEach(() => {
  return seed(data);
})

afterAll(() => {
  return db.end();
})

describe('GET /api', () => {
  test('200: Responds with an object detailing the documentation for each endpoint', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
describe('GET .api/topics', () => {
  test('200: Responds with an object detailing all topics', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({body: {topics}}) => {
      expect(topics.length).not.toBe(0);
      topics.forEach((topic) => {
        expect(typeof topic.slug).toBe('string')
        expect(typeof topic.description).toBe('string')
      })
    })
  })
})