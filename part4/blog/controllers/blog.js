const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs);
        });
});

blogRouter.get('/:id', async (request, response) => {
    const id = request.params.id || null;

    if (!id) return response.status(404).end();

    try {
        const blog = await Blog.findById(id);

        return response.json(blog)
    } catch (error) {
        next(error);
    }
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);
    if (!blog.author || !blog.url || !blog.title) {
        console.log('youre coming to error', blog);
        return response.status(400).json({ message: "missing parameters" });
    }
    if (!blog.likes) blog.likes = 0;

    try {
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
    } catch (error) {
        next(error);
    }
});

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id || null;
    if (!id) return response.status(400).json({ error: 'cannot delete' });;

    try {
        await Blog.findByIdAndRemove(id);
        response.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = blogRouter;