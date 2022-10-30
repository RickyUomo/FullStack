const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const User = require('../models/User');
morgan.token('reqBody', (req) => JSON.stringify(req.body));

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (request, response) => {
    const authorization = request.get('authorization'); // authorization is token generated in login.js jwt.sign

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7);
    } else {
        return null;
    }
};

const userExtractor = async (request, response, next) => {
    const token = tokenExtractor(request);
    if (!token) return;
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!decodedToken) return response.json({ message: "no token found" });
        request.user = await User.findById(decodedToken.id);
        next();
    } catch (error) {
        next(error);
    }
};

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') return response.status(400).send({ message: 'malformatted id' });
    else if (error.name === 'ValidationError') return response.status(400).json({ message: error.message });
    else if (error.name === 'JsonWebTokenError') return response.status(401).json({ message: 'invalid token hahha' });
    else if (error.name === 'TokenExpiredError') return response.status(401).json({ message: 'token expired' });

    next(error);
};

const middleware = { morgan, unknownEndpoint, errorHandler, userExtractor };

module.exports = middleware;