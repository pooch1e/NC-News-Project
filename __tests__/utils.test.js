const { convertTimestampToDate, getArticleId } = require('../db/seeds/utils');

describe('convertTimestampToDate', () => {
  test('returns a new object', () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test('converts a created_at property to a date', () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test('does not mutate the input', () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test('ignores includes any other key-value-pairs in returned object', () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test('returns unchanged object if no created_at property', () => {
    const input = { key: 'value' };
    const result = convertTimestampToDate(input);
    const expected = { key: 'value' };
    expect(result).toEqual(expected);
  });
});

describe('getArticleId', () => {
  test('returns a new object', () => {
    const input = {
      article_title: 'Living in the shadow of a great man',
      body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      votes: 14,
      author: 'butter_bridge',
      created_at: '2020-07-21T01:20:00.000Z',
    };
    const result = getArticleId(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test('when passed a title, selects correct article', async () => {
    const input = {
      article_title: 'Living in the shadow of a great man',
      body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      votes: 14,
      author: 'butter_bridge',
      created_at: '2020-07-21T01:20:00.000Z',
    };
    const expected = {
      article_title: 'Living in the shadow of a great man',
      article_id: 1,
      body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      votes: 14,
      author: 'butter_bridge',
      created_at: '2020-07-21T01:20:00.000Z',
    };
    const result = await getArticleId(input);
    expect(result).toEqual(expected);
  });
  test('does not mutate input', () => {
    const input = {
      article_title: 'Living in the shadow of a great man',
      body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      votes: 14,
      author: 'butter_bridge',
      created_at: '2020-07-21T01:20:00.000Z',
    };
    const copyOfInput = {...input}
    getArticleId(input)
    expect(input).toEqual(copyOfInput);
  });
});
