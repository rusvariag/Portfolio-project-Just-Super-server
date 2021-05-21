// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Modules
const mongoose = require('mongoose');
const schema = require('../models/basket.model');

// Constants
const { DATABASE_BASKET } = require('../utils/constants');

// Schema
const Model = mongoose.model(DATABASE_BASKET, schema);

// ******************************************************************************************************************************
// Queries
// ******************************************************************************************************************************

// Select query
const querySelect = async ({ _id }) => {
    try {
        const result = await Model.findOne({ customer_id: _id }).sort({ _id: -1 }).limit(1).populate('products.product_id').exec();
        return {
            id: result._id,
            products: result.products.map(product => ({
                id: product._id,
                productId: product.product_id._id,
                name: product.product_id.name,
                price: product.product_id.price,
                image: product.product_id.image,
                quantity: product.quantity,
                cost: product.cost,
            })),
        };
    } catch (err) {
        console.log(err);
    }
}

// Create query
const queryInsert = async (data) => {
    try {
        const result = await Model.create(data);
        return result;
    } catch (err) {
        console.log(err);
    }
}

// Update query
const queryUpdate = async ({ _id, data }) => {
    try {
        const doc = await Model.findOne({ _id: _id });
        const pullId = doc.products.find(item => {
            return data.product_id == item.product_id;
        });
        if (pullId) {
            doc.products.pull({ _id: pullId._id });
            await doc.save();
        }
        doc.products.push(data);
        await doc.save();
        const result = await Model.findOne({ _id: _id }).populate('products.product_id').exec();
        return {
            id: result._id,
            products: result.products.map(product => ({
                id: product._id,
                productId: product.product_id._id,
                name: product.product_id.name,
                price: product.product_id.price,
                image: product.product_id.image,
                quantity: product.quantity,
                cost: product.cost,
            })),
        };
    } catch (err) {
        console.log(err);
    }
}

// Delete query
const queryDelete = async ({ _id, product_id }) => {
    try {
        const doc = await Model.findOne({ _id: _id });
        doc.products.pull({ _id: product_id });
        await doc.save();
        const result = await Model.findOne({ _id: _id }).populate('products.product_id').exec();
        return {
            id: result._id,
            products: result.products.map(product => ({
                id: product._id,
                productId: product.product_id._id,
                name: product.product_id.name,
                price: product.product_id.price,
                image: product.product_id.image,
                quantity: product.quantity,
                cost: product.cost,
            })),
        };
    } catch (err) {
        console.log(err);
    }
}

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = {
    querySelect,
    queryInsert,
    queryUpdate,
    queryDelete,
}