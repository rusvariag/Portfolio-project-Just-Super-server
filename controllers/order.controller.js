// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Get services
const { querySelect, queryInsert, queryValidateDate } = require('../services/order.services');

// Get utils
const { reqHandler } = require('../utils/responses');
const { pdfCreator } = require('../utils/pdf-creator');

// ******************************************************************************************************************************
// Handler requests
// ******************************************************************************************************************************

// Select order
exports.select = async (req, res) => {
    const data = await querySelect({ _id: req.params.id })
    pdfCreator(res, data);
}

// Create order
exports.create = (req, res) => {
    const data = {
        basket_id: req.body.basketId,
        customer_id: req.body.customerId,
        total_cost: req.body.totalCost,
        city: req.body.city,
        street: req.body.street,
        shipment_at: req.body.shippingDate,
        credit_card: req.body.creditCard,
    }
    reqHandler(res, queryInsert, data);
}

// Check dates of valit values
exports.validateDate = (req, res) => {
    const date = new Date(req.params.date);
    reqHandler(res, queryValidateDate, { date });
}