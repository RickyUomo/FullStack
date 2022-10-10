jest.setTimeout(100000);
const mongoose = require('mongoose');
const superagent = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const api = superagent(app);

const initialBlogs = [
    {
        author: 'ricky',
        title: 'cool guys',
        likes: 420
    },
    {
        author: 'sophie yan',
        title: 'bod is not fun',
        likes: 666
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
});

test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('blogs have 2 instances', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
});

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/blogs');
    const author = response.body.map(r => r.author);

    expect(author).toContain('ricky');
});

afterAll(() => {
    mongoose.connection.close();
});