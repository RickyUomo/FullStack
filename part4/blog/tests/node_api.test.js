jest.setTimeout(100000);
const mongoose = require('mongoose');
const superagent = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const api = superagent(app);
const helper = require('./test_helper');


// beforeEach(async () => {
//     await Blog.deleteMany({});

//     let blogObject = new Blog(helper.initialBlogs[0]);
//     await blogObject.save();
//     blogObject = new Blog(helper.initialBlogs[1]);
//     await blogObject.save();
// });

test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('blogs have 2 instances', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/blogs');
    const author = response.body.map(r => r.author);

    expect(author).toContain('ricky');
});

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "wonderful life",
        author: "ricky",
        url: "www.happy.com",
        likes: 420
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const response = await api.get('/api/blogs');
    const titles = response.body.map(r => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain('wonderful life');
});

test('a specific blog to view', async () => {
    const blogs = await helper.blogsInDb();
    const blogToView = blogs[0];

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
});



afterAll(() => {
    mongoose.connection.close();
});