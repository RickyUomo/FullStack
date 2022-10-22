const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (request, response, next) => {
    try {
        const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
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
});

blogRouter.post('/', async (request, response, next) => {
    const { title, author, url, likes, userId } = request.body;
    if (!author || !url || !title) return response.status(400).json({ message: "missing parameters" });

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        const user = await User.findById(userId);
        const blog = new Blog({
            title,
            author,
            url,
            likes,
            user: user._id
        });
        if (!blog.likes) blog.likes = 0;
        if (!decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' });

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
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        const blog = await Blog.findById(id);
        if (!blog) return response.json({ message: "no blog found" });
        if (!decodedToken) return response.json({ message: "no token found" });

        if (blog?.user.toString() === decodedToken?.id) { // token user id matches blog creator
            console.log('deleted');
            await Blog.findByIdAndRemove(id);
            response.status(204).end();
        } else {
            response.status(400).json({ message: "The user cannot delete this post" });
        }
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