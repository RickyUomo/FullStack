const express = require('express');
const morgan = require('morgan');
const app = express();
const logger = require('./utils/logger');
const config = require('./utils/config');
const phonebookRouter = require('./controllers/phonebook');

app.use(express.json());
// app.use(cors());
app.use(express.static('build'));
morgan.token('reqBody', (req) => JSON.stringify(req.body));

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.reqBody(req, res)
    ].join(' ');
}));

app.use('/api/persons', phonebookRouter);

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' });
    else if (error.name === 'ValidationError') return response.status(400).json({ error: error.message });

    next(error);
};
app.use(errorHandler);

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});