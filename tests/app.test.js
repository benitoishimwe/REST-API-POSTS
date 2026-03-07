const request = require('supertest');
const app = require('../app');

describe('App basic routes', () => {
  it('GET / should return home message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('We are on home');
  });
});

