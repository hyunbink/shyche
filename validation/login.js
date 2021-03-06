const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
        errors.email = "Invalid Email";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Please enter your email";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Please enter your password";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0 // Login info is valid if there are no errors
    };
};