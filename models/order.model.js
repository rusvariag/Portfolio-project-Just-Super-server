// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Constants
const { DATABASE_BASKET, DATABASE_USER } = require('../utils/constants');

// ******************************************************************************************************************************
// Shema defenition
// ******************************************************************************************************************************

const refSchema = new Schema({
    basket_id: { type: Schema.Types.ObjectId, ref: DATABASE_BASKET },
    customer_id: { type: Schema.Types.ObjectId, ref: DATABASE_USER },
    total_cost: { type: Number, default: 0 },
    city: { type: String, default: '' },
    street: { type: String, default: '' },
    shipment_at: { type: Date, default: new Date() },
    credit_card: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = refSchema;