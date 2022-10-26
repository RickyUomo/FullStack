const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const config = require('./utils/config');

const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message);
    });


app.use(cors());
app.use(express.json());
app.use(middleware.morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.reqBody(req, res)
    ].join(' ');
}));

app.use('/api/blogs', middleware.userExtractor, blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;