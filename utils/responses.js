// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Imports
const jwt = require('jsonwebtoken');

// Get Error handlers
const { handleUserErrors } = require('../utils/error-handlers');

// Constants
const { MAX_SESSION_AGE } = require('../utils/constants');
const { SECRET } = require('../config/index');

// ******************************************************************************************************************************
// Helpers
// ******************************************************************************************************************************
const createToken = (id) => {
    return jwt.sign({ id }, SECRET, { expiresIn: MAX_SESSION_AGE * 1000 });
}

// ******************************************************************************************************************************
// Handler requests
// ******************************************************************************************************************************

const reqHandler = async (res, handler, args) => {
    try {
        const result = await handler(args);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const reqUserHandler = async (res, handler, args) => {
    try {
        const user = await handler(args);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: false, maxAge: MAX_SESSION_AGE * 1000 });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        const errors = handleUserErrors(err);
        res.status(400).json({ errors });
    }
}

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = {
    reqHandler,
    reqUserHandler
};