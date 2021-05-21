// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Constants
const { DATABASE_USER, DATABASE_PRODUCT } = require('../utils/constants');

// ******************************************************************************************************************************
// Shema defenition
// ******************************************************************************************************************************

const refSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: DATABASE_USER },
    status: Boolean,
    products: [{
        product_id: { type: Schema.Types.ObjectId, ref: DATABASE_PRODUCT },
        quantity: Number,
        cost: Number,
    }],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = refSchema;