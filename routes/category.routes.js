// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Get packages
const express = require('express');
const router = express.Router();

// Get controllers
const Controller = require('../controllers/category.controller');

// Get validations
const Validation = require('../validations/category.validation');

// ******************************************************************************************************************************
// Requests routers
// ******************************************************************************************************************************

router.get('/', Controller.selects);
router.get('/:id', Validation.select, Controller.select);

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = router;