const Blog = require('../models/Blog');

const initialBlogs = [
    {
        title: "Fullstack Dev",
        author: "Ricky",
        url: "https://github.com/RickyUomo",
        likes: 420,
        id: "63433515235d446e804f001b"
    },
    {
        title: "Fullstack Dev 666",
        author: "Ricky Awesome",
        url: "https://github.com/RickyUomo",
        likes: 666,
        id: "63433537235d446e804f001e"
    }
];

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', date: new Date() })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})

    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}