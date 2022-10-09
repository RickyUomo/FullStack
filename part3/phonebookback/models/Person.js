const mongoose = require('mongoose');
const config = require('../utils/config');

mongoose.connect(config.MONGODB_URI)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message);
    });

const phoneNumberValidator = (val) => {
    const ary = val.split('-', 2);
    const first = +ary[0],
        second = +ary[1],
        fLength = first.toString().length;
    if (!first || !second || fLength <= 1 || fLength > 3) return false;
};

const phoneNumberCustom = [phoneNumberValidator, 'The format of phone number is wrong!'];

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: phoneNumberCustom
    }
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);