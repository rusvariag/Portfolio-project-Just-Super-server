// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Modules
const { isEmail } = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Local constants
const MIN_LENGTH = 8;

// ******************************************************************************************************************************
// Shema defenition
// ******************************************************************************************************************************

const refSchema = new Schema({
    identity: {
        type: String,
        required: [true, 'Please enter an identity'],
        unique: true,
        validate: [value => /^\d+$/.test(value), 'Please enter a valid identity number']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [MIN_LENGTH, `Minimum password length is ${MIN_LENGTH} characters`]
    },
    firstname: {
        type: String,
        required: [true, 'Please enter firstname'],
    },
    lastname: {
        type: String,
        required: [true, 'Please enter lastname'],
    },
    city: {
        type: String,
        required: [true, 'Please choose city'],
    },
    street: {
        type: String,
        required: [true, 'Please enter street'],
    },
    role: {
        type: String,
        default: 'customer',
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = refSchema;