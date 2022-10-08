require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');
const Person = require('./models/Person');
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

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

app.get('/', (req, res) => {
    return res.end('Phonebook exercise!');
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then(p => {
        res.json(p);
    });
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
});

app.get('/info', (req, res) => {
    const time = new Date();
    const numOfPeople = Person.length;

    res.send(`
        <h3> The phonebook has info for ${numOfPeople} </h3 >
        <p>${time}</p>
    `);
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error));
});

app.post('/api/persons', async (req, res, next) => {
    const body = req.body;

    if (!body.name) return res.status(400).json({ error: 'name is missing' });

    try {
        const findPerson = await Person.find({ name: body.name });

        if (findPerson.length > 0) {
            const id = findPerson[0]._id.toString();
            const person = { name: body.name, number: body.number };
            const updatePerson = await Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' });
            res.json(updatePerson);

        } else {
            const person = new Person({
                name: body.name,
                number: body.number
            });

            const savedPerson = await person.save();
            res.json(savedPerson);
        }

    } catch (error) {
        next(error);
    }
});

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});