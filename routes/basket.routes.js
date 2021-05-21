// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// Get packages
const express = require('express');
const router = express.Router();

// Get controllers
const Controller = require('../controllers/basket.controller');

// Get validations
const Validation = require('../validations/basket.validation');

// ******************************************************************************************************************************
// Requests routers
// ******************************************************************************************************************************

router.get('/:id', Controller.select);
router.post('/', Validation.create, Controller.create);
router.patch('/:id', Validation.update, Controller.update);
router.delete('/:id/:product_id', Validation.delete, Controller.delete);

// ******************************************************************************************************************************
// Export module
// ******************************************************************************************************************************

module.exports = router;