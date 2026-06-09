let companyRepository=require("../../repository/Api/CompanyRepository");
let Response= require("../../library/Response");
const Joi = require('joi');

let companyLists=(req, res)=>{
    return companyRepository.companyLists(req, res);
}

let addCompany=(req, res)=>{

    const userSchema = Joi.object({
        name: Joi.string().min(2).required().messages({
            "string.base": "Name must be a string",
            "string.empty": "Please enter company name",
            "string.min": "Name must be at least 2 characters",
            "any.required": "Name is required",
        }),
        location: Joi.string().min(2).required().messages({
            "string.base": "Location must be a string",
            "string.empty": "Please enter location",
            "string.min": "Location must be at least 2 characters",
            "any.required": "Location is required",
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
       return companyRepository.addCompany(req, res);
    }
}

//going to disable company..
let diableCompany=(req, res)=>{
    return companyRepository.diableCompany(req, res);
}

//going to enable company..
let enableCompany=(req, res)=>{
    return companyRepository.enableCompany(req, res);
}

//fetching company info..
let getCompanyInfo=(req, res)=>{
    return companyRepository.getCompanyInfo(req, res);
}

//updating company info..
let updateCompany=(req, res)=>{
    return companyRepository.updateCompany(req, res);
}

//going to delete company info..
let deleteCompany=(req, res)=>{
    return companyRepository.deleteCompany(req, res);
}

//going to restore company info..
let restoreCompany=(req, res)=>{
    return companyRepository.restoreCompany(req, res);
}

module.exports={
    companyLists,
    addCompany,
    diableCompany,
    enableCompany,
    getCompanyInfo,
    updateCompany,
    deleteCompany,
    restoreCompany
}