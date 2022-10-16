jest.setTimeout(100000);
const helper = require('./test_helper');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config');
const superagent = require('supertest');
const app = require('../app');
const api = superagent(app);

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await mongoose.connect(MONGODB_URI); // prevent deleteMany before connecting to the DB
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('sekret', 10);
        const user = new User({ username: 'root', passwordHash });

        await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const userNames = usersAtEnd.map(u => u.username);
        expect(userNames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "root",
            name: 'Superuser',
            password: 'salainen'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('username must be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toEqual(usersAtStart);
    });
});