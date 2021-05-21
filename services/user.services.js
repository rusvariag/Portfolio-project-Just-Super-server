// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Modules
const mongoose = require('mongoose');
const schema = require('../models/user.model');

// Constants
const { DATABASE_USER } = require('../utils/constants');

// Schema
const Model = mongoose.model(DATABASE_USER, schema);

// ******************************************************************************************************************************
// Queries
// ******************************************************************************************************************************

// Login user
const queryLogin = async (data) => {
    const user = await Model.findOne({ email: data.email });
    if (user) {
        if (user.password === data.password) {
            return user;
        } else {
            throw Error('Invalid password');
        }
    } else {
        throw Error('Invalid user');
    }
}

// Sign up new user
const querySignup = async (data) => {
    try {
        const user = await Model.create(data);
        return user;
    } catch (err) {
        throw err;
    }
}

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = {
    queryLogin,
    querySignup,
}