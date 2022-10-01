const express = require('express');
const morgan = require('morgan')
const app = express();
const PORT = 3333;
app.use(express.json());

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

let persons = [
    {
        id: 1,
        name: 'Arto Hello',
        number: "04012-1239"
    },
    {
        id: 2,
        name: 'Arto Bad',
        number: "040-1999234"
    },
    {
        id: 3,
        name: 'Good Hello',
        number: "040-123234"
    },
    {
        id: 4,
        name: 'Dell Hello',
        number: "040-12323234"
    }
];

app.get('/api/persons', (req, res) => {

    return res.status(200).json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = +req.params.id;
    const person = persons.find(p => p.id === id);

    if (!person) res.status(404).end();

    res.json(person);
})

app.get('/info', (req, res) => {
    const time = new Date();
    const numOfPeople = persons.length;
    res.send(`
        <h3>The phonebook has info for ${numOfPeople} </h3>
        <p>${time}</p>
    `);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = +req.params.id;
    persons = persons.filter(p => p.id !== id);

    console.log(persons);
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    const isNameExisted = persons.find(p => p.name === req.body.name);

    if (!body.name) {
        return res.status(400).json({
            error: "name is missing"
        })
    } else if (isNameExisted) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        id: Math.floor(Math.random() * 9999999),
        name: body.name,
        number: body.number
    }

    console.log(['morgan'], morgan.token);

    persons = persons.concat(person);
    res.json(person);
})

app.listen(PORT);