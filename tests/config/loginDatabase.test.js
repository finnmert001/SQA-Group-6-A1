const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const databaseAPI = require('../../config/login database');

describe('Database API', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should write an entry to the database successfully', async () => {
    const collection = 'testCollection';
    const payload = { key: 'value' };
    const responseData = { id: '123', ...payload };

    mock.onPost(`${databaseAPI.url}${collection}`).reply(200, responseData);

    const response = await databaseAPI.write(collection, payload);

    expect(response.data).toEqual(responseData);
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe(`${databaseAPI.url}${collection}`);
    expect(mock.history.post[0].data).toBe(JSON.stringify(payload));
  });

  it('should handle errors when writing to the database', async () => {
    const collection = 'testCollection';
    const payload = { key: 'value' };

    mock.onPost(`${databaseAPI.url}${collection}`).reply(500);

    await expect(databaseAPI.write(collection, payload)).rejects.toThrow('Request failed with status code 500');
  });
});