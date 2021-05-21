// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Get services
const { querySelects, querySelect } = require('../services/category.services');

// Get utils
const { reqHandler } = require('../utils/responses');

// ******************************************************************************************************************************
// Handler requests
// ******************************************************************************************************************************

// Get all categories
exports.selects = (req, res) => {
    reqHandler(res, querySelects);
}

// Get one category
exports.select = (req, res) => {
    const id = req.params.id;
    reqHandler(res, querySelect, { _id: id });
}