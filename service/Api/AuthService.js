let authRepository = require("../../repository/Api/AuthRepository");
let Response= require("../../library/Response");
const Joi = require('joi');

let authUser = (req, res) => {

    const userSchema = Joi.object({
        username: Joi.string().min(4).required().messages({
            "string.empty": "Please enter username",
            "string.min": "Username should be minimum 4 character",
        }),
        password: Joi.string().min(6).required().messages({
            "string.empty": "Please enter your password",
            "string.min": "Password should be minimum 6 character",
        })
    });

    const { error, value } = userSchema.validate(req.body, {
        abortEarly: false,   // show all errors
        stripUnknown: true   // remove extra fields
    });

    if (error) {
        const formattedErrors = error.details.reduce((acc, err) => {
            const field = err.path.join('.');
            acc[field] = err.message;
            return acc;
        }, {});
        
        return Response.error(res, "Validation Error", formattedErrors, 400);
    }else {
        return authRepository.authUser(req, res);
    }
}

module.exports = {
    authUser
}