require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./Person');
const app = express();
const PORT = process.env.PORT || 3001;
const url = process.env.MONGODB_URI;
app.use(express.json());
app.use(cors());
app.use(express.static('build'));
morgan.token('reqBody', (req, res) => JSON.stringify(req.body));

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.reqBody(req, res)
    ].join(' ')
}));

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
        // mongoose.connection.close();
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message);
        // mongoose.connection.close();
    });

app.get('/', (req, res) => {
    return res.end('Phonebook exercise!');
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then(p => {
        res.json(p);
    })
});

app.get('/api/persons/:id', (req, res, next) => {
    const ID = req.params.id || null;
    if (!ID) return res.status(404).end('no such a person');
    Person.findById(ID)
        .then(p => {
            console.log(['p'], p);
            if (p) res.json(p);
            else res.status(404).send('<h1>Person Not Found</h1>');
        })
        .catch(error => {
            console.log(new Date(), 'cannot find the person', error.message);
            next(error);
        });
})

app.get('/info', (req, res) => {
    const time = new Date();
    const numOfPeople = Person.length;

    res.send(`
        <h3> The phonebook has info for ${numOfPeople} </h3 >
        <p>${time}</p>
    `);
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error))
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name) return res.status(400).json({ error: "name is missing" });

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => res.json(savedPerson))
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' });

    next(error)
};
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});