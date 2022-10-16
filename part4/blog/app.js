const express = require('express');
const app = express();
const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');
const cors = require('cors');


app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);

module.exports = app;