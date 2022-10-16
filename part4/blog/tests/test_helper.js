const Blog = require('../models/Blog');
const User = require('../models/User');

const initialBlogs = [
    {
        title: "Fullstack Dev",
        author: "Ricky",
        url: "https://github.com/RickyUomo",
        likes: 420,
        id: "63433515235d446e804f001b",
    },
    {
        title: "Fullstack Dev 666",
        author: "Ricky Awesome",
        url: "https://github.com/RickyUomo",
        likes: 666,
        id: "63433537235d446e804f001e",
    }
];

const initialUsers = [
    {
        username: 'ricky',
        name: 'super',
        password: 'popo',
        id: "634c63c4b71a0646ede15d68",
    }
]

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

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}

module.exports = {
    initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}