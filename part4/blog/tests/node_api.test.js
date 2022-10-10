const mongoose = require('mongoose');
const superagent = require('supertest');
const app = require('../app');

const api = superagent(app);

test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
}, 100000);

test('blogs have 2 instances', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(2);
});

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].title).toBe('cool guy');
});

afterAll(() => {
    mongoose.connection.close();
});