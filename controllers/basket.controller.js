// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Get services
const { querySelect, queryInsert, queryUpdate, queryDelete } = require('../services/basket.services');

// Get utils
const { reqHandler } = require('../utils/responses');

// ******************************************************************************************************************************
// Handler requests
// ******************************************************************************************************************************

// Select basket
exports.select = (req, res) => {
    const id = req.params.id;
    reqHandler(res, querySelect, { _id: id });
}

// Create basket
exports.create = (req, res) => {
    const { id } = req.body;
    reqHandler(res, queryInsert, { status: true, customer_id: id });
}

// Update basket
exports.update = (req, res) => {
    const id = req.params.id;
    const { _id, quantity, cost } = req.body;
    reqHandler(res, queryUpdate, { _id: id, data: { product_id: _id, quantity, cost } });
}

// Delete basket
exports.delete = (req, res) => {
    const { id, product_id } = req.params;
    reqHandler(res, queryDelete, { _id: id, product_id });
}