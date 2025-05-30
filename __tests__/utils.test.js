const db = require('../db/connection');
const {
  convertTimestampToDate,
  getArticleId,
  getValueFromKey,
} = require('../db/seeds/utils');

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

describe('tests for getValueFromKey function', () => {
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
      return obj
    })
    getValueFromKey(data);
    expect(dataCopy).toEqual(data);
  });
});

// describe('getValueFromKey', () => {
//   test('returns empty object when passed empty array', () => {
//     const inputArray = [];
//     const actual = getValueFromKey(inputArray, 'key', 'value');
//     expect(actual).toEqual({});
//   });
//   test('returns an object with the correct key and value referenced when passed an array with a single object', () => {
//     const inputArray = [
//       {
//         article_title: 'Living in the shadow of a great man',
//         body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
//         votes: 14,
//         author: 'butter_bridge',
//         created_at: '2020-07-21T01:20:00.000Z',
//       },
//     ];

//     const expected = [
//       {
//         article_title: 'Living in the shadow of a great man',
//         body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
//         votes: 14,
//         author: 'butter_bridge',
//         created_at: '2020-07-21T01:20:00.000Z',
//       },
//     ];

//     const actual = getValueFromKey(
//       inputArray,
//       'article_title',
//       'Living in the shadow of a great man'
//     );
//     expect(actual).toEqual(expected);
//   });
//   test('returns an object with the correct key and value referenced when passed an array of multiple objects', () => {
//     const inputArray = [
//       {
//         title: 'Living in the shadow of a great man',
//         topic: 'mitch',
//         author: 'butter_bridge',
//         body: 'I find this existence challenging',
//         created_at: 1594329060000,
//         votes: 100,
//         article_img_url:
//           'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
//       },
//       {
//         title: 'Sony Vaio; or, The Laptop',
//         topic: 'mitch',
//         author: 'icellusedkars',
//         body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
//         created_at: 1602828180000,
//         votes: 0,
//         article_img_url:
//           'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
//       },
//       {
//         title: 'Eight pug gifs that remind me of mitch',
//         topic: 'mitch',
//         author: 'icellusedkars',
//         body: 'some gifs',
//         created_at: 1604394720000,
//         votes: 0,
//         article_img_url:
//           'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
//       },
//     ];
//     const expected = [
//       {
//         title: 'Living in the shadow of a great man',
//         topic: 'mitch',
//         author: 'butter_bridge',
//         body: 'I find this existence challenging',
//         created_at: 1594329060000,
//         votes: 100,
//         article_img_url:
//           'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
//       },
//     ];
//     const actual = getValueFromKey(
//       inputArray,
//       'title',
//       'Living in the shadow of a great man'
//     );
//     expect(actual).toEqual(expected);
//   });
//   test.todo('does not mutate input');
// });

afterAll(async () => {
  await db.end();
});
