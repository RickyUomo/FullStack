const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

blogRouter.get('/', async (request, response, next) => {

    try {
        const allBlogs = await Blog.find({}).populate('user', { username: 1 });
        response.json(allBlogs);
    } catch (error) {
        next(error);
    }
});

blogRouter.get('/:id', async (request, response, next) => {
    const id = request.params.id || null;

    if (!id) return response.status(404).end();

    try {
        const blog = await Blog.findById(id);

        return response.json(blog)
    } catch (error) {
        next(error);
    }
})

blogRouter.post('/', async (request, response, next) => {
    const { title, author, url, likes, userId } = request.body;
    if (!author || !url || !title) return response.status(400).json({ message: "missing parameters" });

    try {
        const user = await User.findById(userId);
        const blog = new Blog({
            title,
            author,
            url,
            likes,
            user: user._id
        });

        if (!blog.likes) blog.likes = 0;

        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.status(201).json(savedBlog);
    } catch (error) {
        next(error);
    }
});

blogRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id || null;
    if (!id) return response.status(400).json({ error: 'cannot delete' });;

    try {
        await Blog.findByIdAndRemove(id);
        response.status(204).end();
    } catch (error) {
        next(error);
    }
});

blogRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id;
    if (!id) return response.status(400).json({ message: "Missing id parameter" });
    const editBlog = request.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, editBlog, { new: true });
        response.json(updatedBlog);
    } catch (error) {
        next(error);
    }
});

module.exports = blogRouter;