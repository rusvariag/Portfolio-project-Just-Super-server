// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Modules
const mongoose = require('mongoose');
const schemaOrder = require('../models/order.model');
const schemaProduct = require('../models/product.model');
const schemaUser = require('../models/user.model');
const schemaBasket = require('../models/basket.model');

// Constants
const { DATABASE_ORDER, DATABASE_PRODUCT, DATABASE_USER, DATABASE_BASKET } = require('../utils/constants');

// Schema
const ModelOrder = mongoose.model(DATABASE_ORDER, schemaOrder);
const ModelProduct = mongoose.model(DATABASE_PRODUCT, schemaProduct);
const ModelUser = mongoose.model(DATABASE_USER, schemaUser);
const ModelBasket = mongoose.model(DATABASE_BASKET, schemaBasket);

// ******************************************************************************************************************************
// Queries
// ******************************************************************************************************************************

// Select query
const querySelect = async (id) => {
    try {
        let user;
        let basket;
        if (id) {
            user = await ModelUser.findOne({ _id: id }).lean();
        }
        if (user) {
            basket = await ModelBasket.findOne({ customer_id: user._id, status: true }, ['created_at']).sort({ _id: -1 }).limit(1).lean();
            order = await ModelOrder.findOne({ customer_id: user._id }, ['created_at']).sort({ _id: -1 }).limit(1).lean();
            if (basket) {
                user = { ...user, cart: { ...basket } }
            }
            if (order) {
                user = { ...user, order: { ...order } }
            }
        }
        const orderCount = await ModelOrder.countDocuments();
        const productCount = await ModelProduct.countDocuments();
        return { orders: orderCount, products: productCount, user: user };
    } catch (err) {
        console.log(err);
    }
}

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = {
    querySelect,
}