// ******************************************************************************************************************************
// Imports
// ******************************************************************************************************************************

// ******************************************************************************************************************************
// Validate request data
// ******************************************************************************************************************************

// Validate for search route
exports.search = (req, res, next) => {
    console.log('Seacrh product path');
    next();
}

// Validate for one route
exports.select = (req, res, next) => {
    console.log('Select product path');
    next();
}

// Validate for create route
exports.create = (req, res, next) => {
    console.log('Create product path');
    next();
}

// Validate for update route
exports.update = (req, res, next) => {
    console.log('Update product path');
    next();
}