jest.setTimeout(100000);
const mongoose = require('mongoose');
const superagent = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const api = superagent(app);
const helper = require('./test_helper');
const { MONGODB_URI } = require('../utils/config');


beforeEach(async () => {
    await mongoose.connect(MONGODB_URI); // prevent delete before connecting to the DB
    await Blog.deleteMany({});

    // let blogObject = new Blog(helper.initialBlogs[0]);
    // await blogObject.save();
    // blogObject = new Blog(helper.initialBlogs[1]);
    // await blogObject.save();

    const blogObjects = helper.initialBlogs.map(b => new Blog(b));
    const promiseArray = blogObjects.map(b => b.save());
    const result = await Promise.all(promiseArray);
    // console.log(['result'], result);
});

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

    expect(author).toContain('Ricky');
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

test('can delete blog', async () => {
    const blogsStart = await helper.blogsInDb();
    const blogToDelete = blogsStart[0];

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

    const blogsEnd = await helper.blogsInDb();
    expect(blogsEnd).toHaveLength(helper.initialBlogs.length - 1);

    const authors = blogsEnd.map(b => b.author);
    expect(authors).not.toContain(blogToDelete.author);
});

test.only('blog id is defined', async () => {
    const blogsStart = await helper.blogsInDb();
    const blogToView = blogsStart[0];

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(resultBlog.body.id).toBeDefined();
})

afterAll(() => {
    mongoose.connection.close();
});