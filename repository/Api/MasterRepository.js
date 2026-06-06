let DB=require("../../models/index");
let codeGenerator=require("../../library/CodeGenerator");
let response=require("../../library/Response");
let messages=require("../../library/Message");

const validator = require('validator');

//fetching company list.
let companyLists=async(req, res)=>{
   try {
      let departments=await DB.Company.findAll({
      where:[
         {status:"1"}
      ],
      attributes:['id', 'name', 'logo'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, departments);
   } catch (error) {
     return response.error(res, error.message);
  }
}

//fetching user types list.
let userTypes=async(req, res)=>{
   try {
      let userTypeLists=await DB.UserType.findAll({
      where:[
         {status:"1"}
      ],
      attributes:['id', 'name'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, userTypeLists);
    } catch (error) {
     return response.error(res, error.message);
    }
}

//fetching user types list.
let saluationsList=async(req, res)=>{
   try {
      let userTypes=await DB.Saluation.findAll({
      where:[
         {status:"1"}
      ],
      attributes:['id', 'name'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, userTypes);
   } catch (error) {
     return response.error(res, error.message);
    }
}


//fetching departments list.
let departmentList=async(req, res)=>{
   try {
      let departments=await DB.Department.findAll({
      where:[
         {status:"1"},{company_id:req.params.companyId}
      ],
      attributes:['id', 'name'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, departments);
    } catch (error) {
     return response.error(res, error.message);
    }
}

//fetching departments list.
let bloodGroupList=async(req, res)=>{
   try {
      let bloodGroups=await DB.BloodGroup.findAll({
      where:[
         {status:"1"},{company_id:req.params.companyId}
      ],
      attributes:['id', 'name'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, bloodGroups);
   } catch (error) {
     return response.error(res, error.message);
   }
}

//fetching designations list.
let designationList=async(req, res)=>{
   try {
      let designations=await DB.Designation.findAll({
      where:[
         {status:"1"},{company_id:req.params.companyId}
      ],
      attributes:['id', 'name'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, designations);
    } catch (error) {
     return response.error(res, error.message);
   }
}

//fetching users list.
let usersList=async(req, res)=>{
   try {
      let usersList=await DB.User.findAll({
      where:[
         {status:"1"},{company_id:req.params.companyId}
      ],
      attributes:['id', 'first_name', 'last_name', 'mobile', 'email'],
      orderBy:{first_name:'ASC'}
      });
      return response.success(res, messages.recordFound, usersList);
   } catch (error) {
     return response.error(res, error.message);
   }
}

//fetching users list.
let employeeCategory=async(req, res)=>{
   try {
      let empCategory=await DB.EmployeeCategory.findAll({
      where:[
         {status:"1"},{company_id:req.params.companyId}
      ],
      attributes:['id', 'name'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, empCategory);
   } catch (error) {
     return response.error(res, error.message);
   }
}

//fetching users list.
let employmentType=async(req, res)=>{
   try {
      let employementTypes=await DB.EmployementType.findAll({
      where:[
         {status:"1"},{company_id:req.params.companyId}
      ],
      attributes:['id', 'name'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, employementTypes);
   } catch (error) {
     return response.error(res, error.message);
   }
}

//fetching grade list.
let gradeLists=async(req, res)=>{
   try {
      let gradeList=await DB.Grade.findAll({
      where:[
         {status:"1"},{company_id:req.params.companyId}
      ],
      attributes:['id', 'name'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, gradeList);
   } catch (error) {
     return response.error(res, error.message);
   }
}

//fetching countries list.
let countryLists=async(req, res)=>{
   try {
      let countries=await DB.Country.findAll({
      attributes:['id', 'shortname', 'name', 'phonecode'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, countries);
   } catch (error) {
     return response.error(res, error.message);
   }
}

//fetching states list.
let stateLists=async(req, res)=>{
   try {
      let states=await DB.State.findAll({
      where:{country_id: req.params.countryId},
      attributes:['id', 'name'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, states);
   } catch (error) {
     return response.error(res, error.message);
   }
}

//fetching cities list.
let citiesList=async(req, res)=>{
   try {
      let states=await DB.City.findAll({
      where:{state_id: req.params.stateId},
      attributes:['id', 'name'],
      orderBy:{name:'ASC'}
      });
      return response.success(res, messages.recordFound, states);
   } catch (error) {
     return response.error(res, error.message);
   }
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