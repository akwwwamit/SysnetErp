let companyService=require("../../service/Api/CompanyService");

let companyLists=(req, res)=>{
    return companyService.companyLists(req, res);
}

let addCompany=(req, res)=>{
    return companyService.addCompany(req, res);
}

//going to disable company
let diableCompany=(req, res)=>{
    return companyService.diableCompany(req, res);
}

//going to enable company
let enableCompany=(req, res)=>{
    return companyService.enableCompany(req, res);
}

//going to enable company
let getCompanyInfo=(req, res)=>{
    return companyService.getCompanyInfo(req, res);
}

//going to update company
let updateCompany=(req, res)=>{
    return companyService.updateCompany(req, res);
}

//going to delete company
let deleteCompany=(req, res)=>{
    return companyService.deleteCompany(req, res);
}

//going to restore company
let restoreCompany=(req, res)=>{
    return companyService.restoreCompany(req, res);
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