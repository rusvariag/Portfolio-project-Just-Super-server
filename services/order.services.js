// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Modules
const mongoose = require('mongoose');
const schema = require('../models/order.model');
const schemaBasket = require('../models/basket.model');

// Constants
const { DATABASE_ORDER, DATABASE_BASKET } = require('../utils/constants');

// Schema
const Model = mongoose.model(DATABASE_ORDER, schema);
const ModelBasket = mongoose.model(DATABASE_BASKET, schemaBasket);

// ******************************************************************************************************************************
// Queries
// ******************************************************************************************************************************

// Select query
const querySelect = async ({ _id }) => {
    try {
        const result = await Model.findOne({ _id }, 'basket_id customer_id total_cost city street shipment_at credit_card created_at')
            .populate('customer_id', '-_id identity firstname lastname email')
            .populate({
                path: 'basket_id',
                select: '-_id products',
                populate: {
                    path: 'products',
                    select: '-_id product_id qunatity cost',
                    populate: {
                        path: 'product_id',
                        select: '-_id name price',
                    }
                }
            }).lean().map(res => {
                return {
                    id: res._id,
                    user: { ...res.customer_id },
                    products: res.basket_id.products.map(product => {
                        return {
                            quantity: '' + product.quantity.toFixed(2),
                            cost: '$ ' + product.cost.toFixed(2),
                            name: product.product_id.name,
                            price: '$ ' + product.product_id.price.toFixed(2),
                        };
                    }),
                    city: res.city,
                    street: res.street,
                    shipment_at: res.shipment_at.toLocaleDateString("en-GB"),
                    issued_at: res.created_at.toLocaleDateString("en-GB"),
                    credit_card: res.credit_card,
                    total_cost: '$ ' + res.total_cost.toFixed(2),
                }
            })
        return result;
    } catch (err) {
        console.log(err);
    }
}

// Insert query
const queryInsert = async (data) => {
    try {
        const result = await Model.create(data);
        await ModelBasket.findOneAndUpdate({ _id: data.basket_id }, { status: false })
        return result._id;
    } catch (err) {
        console.log(err);
    }
}

// Check if date is valid to make insert
const queryValidateDate = async ({ date }) => {
    try {
        const result = await Model.findOne({ shipment_at: date }).countDocuments();
        return result;
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
    queryValidateDate
}