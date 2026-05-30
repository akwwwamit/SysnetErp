let userRepository=require("../../repository/Api/UserRepository");
let Response= require("../../library/Response");
const Joi = require('joi');

//fetching users list.
let usersList=(req, res)=>{

}


//Adding user information and validating.
let addUser=(req, res)=>{

    const userSchema = Joi.object({
        companyId: Joi.number().integer().required().messages({
            "number.base": "Company id must be a number",
            "number.integer": "Company id must be an integer",
            "any.required": "Please select company"
        }),
        saluation: Joi.number().integer().required().messages({
            "number.base": "Saluation must be a number",
            "number.integer": "Saluation must be an integer",
            "any.required": "Please select Saluation"
        }),
        firstName: Joi.string().min(2).required().messages({
            "string.empty": "Please enter your first name",
            "string.min": "First name should be minimum 2 character",
        }),
        lastName: Joi.string().min(2).required().messages({
            "string.empty": "Please enter your last name",
            "string.min": "Last name should be minimum 2 character",
        }),
        mobile: Joi.string().min(5).required().messages({
            "string.empty": "Please enter mobile number",
            "string.min": "Mobile number should be minimum 5 character",
        }),
        password: Joi.string()
        .min(8)
        .max(20)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .required()
        .messages({
            "string.empty": "Please enter your password",
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password cannot exceed 20 characters",
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "any.required": "Password is required"
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
       return userRepository.usersList(req, res);
    }
    
}

module.exports={
    usersList,
    addUser
}