// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Get packages
const express = require('express');
const router = express.Router();

// Get controllers
const Controller = require('../controllers/product.controller');

// Get validations
const Validation = require('../validations/product.validation');

// ******************************************************************************************************************************
// Requests routers
// ******************************************************************************************************************************

router.post('/search', Validation.search, Controller.search);
router.get('/:id', Validation.select, Controller.select);
router.post('/', Validation.create, Controller.create);
router.patch('/:id', Validation.update, Controller.update);

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = router;