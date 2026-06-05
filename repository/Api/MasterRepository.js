let DB=require("../../models/index");
let codeGenerator=require("../../library/CodeGenerator");
let response=require("../../library/Response");

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
      return response.success(res, 'Record found', departments);
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
      return response.success(res, 'Record found', userTypeLists);
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
      return response.success(res, 'Record found', userTypes);
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
      return response.success(res, 'Record found', departments);
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
      return response.success(res, 'Record found', bloodGroups);
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
      return response.success(res, 'Record found', designations);
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
      return response.success(res, 'Record found', usersList);
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
      return response.success(res, 'Record found', empCategory);
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
      return response.success(res, 'Record found', employementTypes);
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
      return response.success(res, 'Record found', gradeList);
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
   gradeLists
}