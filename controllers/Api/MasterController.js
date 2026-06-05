let masterService=require("../../service/Api/MasterService");


//fetching company lists
let companyLists=(req, res)=>{
    return masterService.companyLists(req, res);
}

//fetching user types lists
let userTypes=(req, res)=>{
    return masterService.userTypes(req, res);
}

//fetching saluations lists
let saluationsList=(req, res)=>{
    return masterService.saluationsList(req, res);
}


//fetching blood group lists
let bloodGroupList=(req, res)=>{
    return masterService.bloodGroupList(req, res);
}


//fetching users list
let departmentList=(req, res)=>{
    return masterService.departmentList(req, res);
}

//fetching users list
let designationList=(req, res)=>{
    return masterService.designationList(req, res);
}

//fetching users list
let usersList=(req, res)=>{
    return masterService.usersList(req, res);
}

//fetching employee category
let employeeCategory=(req, res)=>{
    return masterService.employeeCategory(req, res);
}

//fetching employee category
let employmentType=(req, res)=>{
    return masterService.employmentType(req, res);
}

//fetching grade lists
let gradeLists=(req, res)=>{
    return masterService.gradeLists(req, res);
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
    gradeLists
}