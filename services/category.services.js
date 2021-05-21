// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Modules
const mongoose = require('mongoose');
const schema = require('../models/category.model');

// Constants
const { DATABASE_CATEGORY } = require('../utils/constants');

// Schema
const Model = mongoose.model(DATABASE_CATEGORY, schema);

// ******************************************************************************************************************************
// Queries
// ******************************************************************************************************************************

// Select all query
const querySelects = async () => {
    try {
        const result = await Model.find({}, ['_id', 'name']);
        return result;
    } catch (err) {
        console.log(err);
    }
}

// Select query
const querySelect = async (_id) => {
    try {
        const result = await Model.findOne({ _id }, ['_id', 'name', 'products']).populate('products', 'name price image').exec();
        return { count: 1, data: result };
    } catch (err) {
        console.log(err);
    }
}

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = {
    querySelects,
    querySelect,
}