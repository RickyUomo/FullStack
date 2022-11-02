const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

blogRouter.get('/', async (request, response, next) => {
    const user = request.user || null;
    if (!user) return response.json({ message: 'No user found!!!' });

    try {
        const userID = user._id.toString();
        const foundUser = await User.findById(userID).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });
        response.json(foundUser.blogs);
    } catch (error) {
        next(error);
    }
});

blogRouter.get('/:id', async (request, response, next) => {
    const id = request.params.id || null;
    const user = request.user || null;

    if (!id) return response.status(404).end();
    if (!user) return response.json({ message: "no user found" });

    try {
        const blog = await Blog.findById(id);
        return response.json(blog)
    } catch (error) {
        next(error);
    }
});

blogRouter.post('/', async (request, response, next) => {
    const { title, author, url, likes } = request.body;
    if (!author || !url || !title) return response.status(400).json({ message: "missing parameters" });

    try {
        const userId = request.user.id || 0;
        if (!userId) return response.status(400).json({ message: "cannot validate the token of userId" });

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
    if (!id) return response.status(400).json({ message: 'missing id' });;

    try {
        const blog = await Blog.findById(id);
        const user = request.user || null;
        if (!blog) return response.json({ message: "no blog found" });
        if (!user) return response.json({ message: "no user found" });

        if (blog?.user?.toString() === user?.id) { // token user id matches blog creator
            await Blog.findByIdAndRemove(id);
            response.status(204).end();
        } else {
            response.status(401).json({ message: "The user cannot delete this post" });
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