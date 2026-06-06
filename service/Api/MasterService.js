let masterRepository=require("../../repository/Api/MasterRepository");
let Response= require("../../library/Response");
const Joi = require('joi');

//fetching company lists.
let companyLists=(req, res)=>{
    return masterRepository.companyLists(req, res);
}

//fetching userTypes lists.
let userTypes=(req, res)=>{
    return masterRepository.userTypes(req, res);
}

//fetching userTypes lists.
let saluationsList=(req, res)=>{
    return masterRepository.saluationsList(req, res);
}


//fetching users list.
let departmentList=(req, res)=>{
    return masterRepository.departmentList(req, res);
}

//fetching users list.
let bloodGroupList=(req, res)=>{
    return masterRepository.bloodGroupList(req, res);
}

//fetching designations list.
let designationList=(req, res)=>{
    return masterRepository.designationList(req, res);
}

//fetching designations list.
let usersList=(req, res)=>{
    return masterRepository.usersList(req, res);
}

//fetching employee category list.
let employeeCategory=(req, res)=>{
    return masterRepository.employeeCategory(req, res);
}

//fetching employement type list.
let employmentType=(req, res)=>{
    return masterRepository.employmentType(req, res);
}

//fetching grade lists.
let gradeLists=(req, res)=>{
    return masterRepository.gradeLists(req, res);
}

//fetching country lists.
let countryLists=(req, res)=>{
    return masterRepository.countryLists(req, res);
}

//fetching states lists.
let stateLists=(req, res)=>{
    return masterRepository.stateLists(req, res);
}

//fetching cities lists.
let citiesList=(req, res)=>{
    return masterRepository.citiesList(req, res);
}

module.exports={
    companyLists,
    userTypes,
    departmentList,
    saluationsList,
    bloodGroupList,
    designationList,
    usersList,
    employeeCategory,
    employmentType,
    gradeLists,
    countryLists,
    stateLists,
    citiesList
}