// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Modules
const mongoose = require('mongoose');
const schema = require('../models/product.model');

// Constants
const { DATABASE_PRODUCT } = require('../utils/constants');

// Schema
const Model = mongoose.model(DATABASE_PRODUCT, schema);

// ******************************************************************************************************************************
// Queries
// ******************************************************************************************************************************

// Select all query
const querySearch = async (data) => {
    try {
        const result = await Model.find({ name: { "$regex": data.searchValue, "$options": "i" } }, ['_id', 'name', 'price', 'category_id', 'image']);
        return result;
    } catch (err) {
        console.log(err);
    }
}

// Select query
const querySelect = async (id) => {
    try {
        const result = await Model.find({ category_id: id }, ['_id', 'name', 'price', 'category_id', 'image']);
        return result;
    } catch (err) {
        console.log(err);
    }
}

// Insert query
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
        const result = await Model.findOneAndUpdate({ _id }, data, { new: true });
        return result;
    } catch (err) {
        console.log(err);
    }
}

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = {
    querySearch,
    querySelect,
    queryInsert,
    queryUpdate,
}