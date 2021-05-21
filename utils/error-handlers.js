// User handle errors
module.exports.handleUserErrors = (err) => {

    // Create errors object
    const errors = { identity: '', firstname: '', lastname: '', email: '', password: '', city: '', street: '' };

    // Duplicate error code
    if (err.code === 11000 && err.keyValue.hasOwnProperty('identity')) {
        errors.identity = 'That identity is already registered';
    }

    if (err.code === 11000 && err.keyValue.hasOwnProperty('email')) {
        errors.email = 'That email is already registered';
    }

    // Database validation errors 
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}