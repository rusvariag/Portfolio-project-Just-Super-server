// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Get services
const { queryLogin, querySignup } = require('../services/user.services');

// Get utils
const { reqUserHandler } = require('../utils/responses');

// ******************************************************************************************************************************
// Handler requests
// ******************************************************************************************************************************

// Log in to the system
exports.login = (req, res) => {
    const { email, password } = req.body;
    reqUserHandler(res, queryLogin, { email, password } );
}

// Log out from the system
exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.json({});
}

// Sign up to the system
exports.signup = async (req, res) => {
    const { identity, firstname, lastname, email, password, city, street } = req.body;
    reqUserHandler(res, querySignup, { identity, firstname, lastname, email, password, city, street } );
}