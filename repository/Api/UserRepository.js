let DB=require("../../models/index");
const validator = require('validator');
const bcrypt = require('bcrypt');

let usersList=async(req, res)=>{

   const dob = req.body.dob ? new Date(req.body.dob).toISOString().split('T')[0] : null;
   const weddingDate = req.body.weddingDate ? new Date(req.body.weddingDate).toISOString().split('T')[0] : null;
   const doj = req.body.doj ? new Date(req.body.doj).toISOString().split('T')[0] : null;
    console.log(dob);
    let user=await DB.User.create({
        "company_id":req.body.companyId,
        "user_type_id":req.body.userType,
        "saluation_id":req.body.saluation,
        "blood_group_id":req.body.bloodGroup,
        "designation_id":req.body.designation,
        "department_id":req.body.department,
        "emp_category_id":req.body.empCategory,
        "employement_type_id":req.body.employementType,
        "grade_id":req.body.grade,
        "first_name":validator.escape(req.body.firstName.trim()),
        "last_name":validator.escape(req.body.lastName.trim()),
        "mobile":validator.escape(req.body.mobile.trim()),
        "email":validator.escape(req.body.email.trim()),
        "password":await bcrypt.hash(validator.escape(req.body.password.trim()), 10),
        "refrence_number":validator.escape(req.body.refrenceNumber.trim()),
        "gender":validator.escape(req.body.gender.trim()),
        "dob":dob,
        "place_of_birth":validator.escape(req.body.placeOfBirth.trim()),
        "marrital_status":validator.escape(req.body.marritalStatus.trim()),
        "wedding_date":weddingDate,
        "doj":doj,
        "biomatric_id":validator.escape(req.body.biomatricId.trim()),
        "status":1,
        "created_at":Date.now(),
        "created_by":req.body.createdBy,

    });
    res.send(req.body);
}

module.exports={
    usersList
}