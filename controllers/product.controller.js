// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');

// Get services
const { querySearch, querySelect, queryInsert, queryUpdate } = require('../services/product.services');

// Get utils
const { reqHandler } = require('../utils/responses');

// ******************************************************************************************************************************
// Handler requests
// ******************************************************************************************************************************

// Search products
exports.search = (req, res) => {
    const { searchValue } = req.body
    reqHandler(res, querySearch, { searchValue });
}

// Select products
exports.select = (req, res) => {
    const id = req.params.id;
    reqHandler(res, querySelect, { _id: id });
}

// Create product
exports.create = (req, res) => {
    const fileExtension = req.files.image.name.split('.').pop();
    const fileName = mongoose.Types.ObjectId().toHexString();
    const filePath = path.join(__dirname, '..', 'public/product-images', `${fileName}.${fileExtension}`);
    req.files.image.mv(filePath, err => {
        if (err) {
            return res.sendStatus(400);
        }
        const data = Object.assign(req.body, { image: `product-images/${fileName}.${fileExtension}` });
        reqHandler(res, queryInsert, data);
    });
}

// Update product
exports.update = (req, res) => {
    if (req.files == null) {
        reqHandler(res, queryUpdate, { _id: req.params.id, data: req.body });
    } else {
        const fileExtension = req.files.image.name.split('.').pop();
        const fileName = mongoose.Types.ObjectId().toHexString();
        const filePath = path.join(__dirname, '..', 'public/product-images', `${fileName}.${fileExtension}`);
        req.files.image.mv(filePath, err => {
            if (err) {
                return res.sendStatus(400);
            }
            const data = Object.assign(req.body, { image: `product-images/${fileName}.${fileExtension}` });
            reqHandler(res, queryUpdate, { _id: req.params.id, data: data });
        });
    }
}
