const db = require('../db/connection');
const {
  convertTimestampToDate,
  getArticleId,
  getValueFromKey,
} = require('../db/seeds/utils');

describe.skip('convertTimestampToDate', () => {
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

describe.skip('getArticleId', () => {
  test('returns a new object', async () => {
    const input = {
      article_title: 'Living in the shadow of a great man',
      body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      votes: 14,
      author: 'butter_bridge',
      created_at: '2020-07-21T01:20:00.000Z',
    };
    const result = await getArticleId(input);
    expect(result).not.toBe(input);
    expect(typeof result).toBe('object');
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
  test('does not mutate input', async () => {
    const input = {
      article_title: 'Living in the shadow of a great man',
      body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      votes: 14,
      author: 'butter_bridge',
      created_at: '2020-07-21T01:20:00.000Z',
    };
    const copyOfInput = { ...input };
    await getArticleId(input);
    expect(input).toEqual(copyOfInput);
  });
});

describe.skip('tests for getValueFromKey function', () => {
  test('when passed an empty array, returns an empty object', () => {
    const actual = getValueFromKey([]);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  test('when passed array with one name, returns name mapped to object with value and property', () => {
    const data = [{ name: 'Rose', id: 'dS8rJns', secretFear: 'spiders' }];
    const expected = { Rose: 'dS8rJns' };
    expect(getValueFromKey(data, 'name', 'id')).toEqual(expected);
  });
  test('when passed array with one multiple names, returns name mapped to object with value and property', () => {
    const data = [
      { name: 'Rose', id: 'dS8rJns', secretFear: 'spiders' },
      { name: 'Simon', id: 'Pk34ABs', secretFear: 'mice' },
      { name: 'Jim', id: 'lk1ff8s', secretFear: 'bears' },
      { name: 'David', id: 'og8r0nV', secretFear: 'Rose' },
    ];
    const expected = {
      Rose: 'dS8rJns',
      Simon: 'Pk34ABs',
      Jim: 'lk1ff8s',
      David: 'og8r0nV',
    };
    const expectedTwo = {
      Rose: 'spiders',
      Simon: 'mice',
      Jim: 'bears',
      David: 'Rose',
    };
    expect(getValueFromKey(data, 'name', 'id')).toEqual(expected);
    expect(getValueFromKey(data, 'name', 'secretFear')).toEqual(expectedTwo);
  });
  test('returns object with correct values and properties', () => {
    const data = [
      { name: 'Rose', id: 'dS8rJns', secretFear: 'spiders' },
      { name: 'Simon', id: 'Pk34ABs', secretFear: 'mice' },
      { name: 'Jim', id: 'lk1ff8s', secretFear: 'bears' },
      { name: 'David', id: 'og8r0nV', secretFear: 'Rose' },
    ];
    const expected = {
      spiders: 'dS8rJns',
      mice: 'Pk34ABs',
      bears: 'lk1ff8s',
      Rose: 'og8r0nV',
    };
    expect(getValueFromKey(data, 'secretFear', 'id')).toEqual(expected);
  });
  test('returns a new object', () => {
    const actual = getValueFromKey(
      [{ name: 'Rose', id: 'dS8rJns', secretFear: 'spiders' }],
      'name',
      'id'
    );
    expect(actual).not.toBe({ Rose: 'dS8rJns' });
  });
  test('does not mutate original array', () => {
    const data = [{ name: 'Rose', id: 'dS8rJns', secretFear: 'spiders' }];
    const dataCopy = data.map((obj) => {
      return obj;
    });
    getValueFromKey(data);
    expect(dataCopy).toEqual(data);
  });
});

afterAll(async () => {
  await db.end();
});
