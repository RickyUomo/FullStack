const phonebookRouter = require('express').Router();
const Person = require('../models/Person');

phonebookRouter.get('/', async (request, response, next) => {
    try {
        const allPerson = await Person.find({});
        response.json(allPerson);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

phonebookRouter.get('/:id', async (request, response, next) => {
    try {
        const ID = request.params.id || null;
        if (!ID) return response.status(404).end('no such a person');

        const thePerson = await Person.findById(ID);
        if (thePerson) response.json(thePerson);
        else response.status(404).send('<h1>Person Not Found</h1>');
    } catch (error) {
        console.log(new Date(), 'cannot find the person', error.message);
        next(error);
    }
});

phonebookRouter.get('/about/info', (request, response) => {
    const time = new Date();
    const numOfPeople = Person.length;

    response.status(200).send(`
        <h3> The phonebook has info for ${numOfPeople} </h3 >
        <p>${time}</p>
    `);
});

phonebookRouter.post('/', async (request, response, next) => {

    const body = request.body,
        name = body.name || null,
        number = body.number || null;

    if (!name || !number) return response.status(400).json({ error: 'name or number is missing' });

    try {
        const findPerson = await Person.find({ name });

        if (findPerson.length) {
            const id = findPerson[0]._id.toString();
            const person = { name, number };
            const updatePerson = await Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' });

            response.json(updatePerson);
        } else {
            const person = new Person({
                name,
                number
            });

            const savedPerson = await person.save();
            response.json(savedPerson);
        }
    } catch (error) {
        next(error);
    }
});

phonebookRouter.delete('/:id', async (request, response, next) => {

    const id = request.params.id || null;

    if (!id) return response.status(400).json({ error: 'cannot delete' });

    try {
        await Person.findByIdAndRemove(id);
        response.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = phonebookRouter;