let DB=require("../../models/index");
let codeGenerator=require("../../library/CodeGenerator");
let response=require("../../library/Response");
let message=require("../../library/Message");
let {Op} =require("sequelize");
const validator = require('validator');
const bcrypt = require('bcrypt');

//fetching users list.
let usersList = async (req, res) => {
  try {
    let limit = parseInt(req.body.limit) || 10;
    let pageNumber = parseInt(req.body.pageNumber) || 1;
    const offset = (pageNumber - 1) * limit;
    const keyword = req.body.keyword || "";

    let whereClause = {};
    if (req.body.userCode.trim()) {
      whereClause[Op.or] = [{ user_code: { [Op.like]: `%${req.body.userCode.trim()}%` }}];
    }

    if (req.body.firstName.trim()) {
      whereClause[Op.or] = [{ first_name: { [Op.like]: `%${req.body.firstName.trim()}%` }}];
    }

    if (req.body.lastName.trim()) {
      whereClause[Op.or] = [{ last_name: { [Op.like]: `%${req.body.lastName.trim()}%` }}];
    }

    if (req.body.mobile.trim()) {
      whereClause[Op.eq] = [{ mobile: { [Op.like]: `%${req.body.mobile.trim()}%` }}];
    }

   if (req.body.email.trim()) {
     whereClause[Op.eq] = [{ email: { [Op.like]: `%${req.body.email.trim()}%` }}];
   }

   if (req.body.status?.trim()) {
      whereClause.status = req.body.status.trim();
   }

    let usersList = await DB.User.findAndCountAll({
      where: whereClause,
      attributes: [
        "id","user_code","first_name","last_name","mobile","email","status","created_at","updated_at"
      ],
      include:[{model:DB.Designation, left:true, attributes:['name']},
      {model:DB.Saluation, left:true, attributes:['name']},
      {model:DB.UserType, left:true, attributes:['name']},
      {model:DB.Department, left:true, attributes:['name']},
      {model:DB.ApprovalStatus, left:true, attributes:['name']},
   ],
      limit,
      offset,
      order: [["id", "DESC"]],
    });
   
    let data = {
      totalRecord: usersList.count,
      totalpage: Math.ceil(usersList.count / limit),
      records: usersList.rows,
    };
     let messages=usersList?.count ? message.recordFound : message.noRecord;
     return response.success(res, messages, data);
  } catch (error) {
     return response.error(res, message.serverError);
  }
};


let addUser=async(req, res)=>{

   //checking duplicate mobile number
   let checkMobile=await DB.User.findAndCountAll({where:{mobile:req.body.mobile.trim()}});
   if (checkMobile?.count) {
      return response.error(res, "Duplicate mobile number found.");
   }
   //checking duplicate email
   let checkEmail=await DB.User.findAndCountAll({where:{email:req.body.email.trim()}});
   if (checkEmail?.count) {
      return response.error(res, "Duplicate email found.");
   }

   const dob = req.body.dob ? new Date(req.body.dob).toISOString().split('T')[0] : null;
   const weddingDate = req.body.weddingDate ? new Date(req.body.weddingDate).toISOString().split('T')[0] : null;
   const doj = req.body.doj ? new Date(req.body.doj).toISOString().split('T')[0] : null;
   let UserCode=await codeGenerator.generateUserCode();
    try {
        let user=await DB.User.create({
            "company_id":req.body.companyId,
            "user_code":UserCode,
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
            "approval_status":1,
            "created_at":Date.now(),
            "created_by":req.body.createdBy,
          });

          //adding user work permit.
          if (user?.id) {
             let dlExpiery=req.body?.legal?.dlExpieryDate ? new Date(req.body.legal.dlExpieryDate).toISOString().split('T')[0] : null;
             let passportExp=req.body?.legal?.passportExpDate ? new Date(req.body.legal.passportExpDate).toISOString().split('T')[0] : null;
             let workPermitExpDate=req.body?.legal?.workPermitExpDate ? new Date(req.body.legal.workPermitExpDate).toISOString().split('T')[0] : null;
             DB.UsersLegal.create({
                "user_id":user.id,
                "dl_no":req.body?.legal?.dlNo.trim(),
                "dl_expiery_date":dlExpiery,
                "passport_no":req.body?.legal?.passportNumber.trim(),
                "passport_expiery_date":passportExp,
                "work_permit_no":req.body?.legal?.workPermitNumber.trim(),
                "work_permit_expiery_date":workPermitExpDate,
                "status":1,
                "created_at":Date.now(),
                "created_by":req.body.createdBy,
             });
          }

          //adding user addresses
          if (user?.id && (req.body?.address?.length)) {
              let address=[];
              for (let data of req.body.address) {
                 let record={
                    "user_id":user?.id,
                    "address_type":validator.escape(data.addressType.trim()),
                    "country_id":data?.country ? data.country : null,
                    "state_id":data?.state ? data?.state : null,
                    "city_id":data?.city ? data?.city: null,
                    "pincode":data?.pincode ? validator.escape(data.pincode.trim()) : null,
                    "address":data?.address ? validator.escape(data.address.trim()) : null,
                    "status":1,
                    "created_at":Date.now(),
                    "created_by":req.body.createdBy
                 };
                 address.push(record);
              }
              DB.UsersAddress.bulkCreate(address);
          }

          //adding user family.
           if (user?.id && req.body?.family?.length>0) {
               let family=[];
               for (let data of req.body.family) {
                  let record={
                     "user_id":user?.id,
                     "name":data.name.trim(),
                     "gender":data?.gender ? data.gender.trim() : null,
                     "relation":data?.relation ? data?.relation.trim() : null,
                     "contact":data?.contact ? data?.contact.trim(): null,
                     "status":1,
                     "created_at":Date.now(),
                     "created_by":req.body.createdBy
                  };
                  family.push(record);
               }
               DB.UsersFamily.bulkCreate(family);
           }

           //Adding users education.
           if (user?.id && req.body?.education?.length>0) {
               let education=[];
               for (let data of req.body.education) {
                  let record={
                     "user_id":user?.id,
                     "course":data.course.trim(),
                     "college":data?.college ? data.college.trim() : null,
                     "result":data?.result ? data?.result.trim() : null,
                     "passing_year":data?.passingYear ? data?.passingYear.trim() : null,
                     "remarks":data?.remarks ? data?.remarks.trim() : null,
                     "status":1,
                     "created_at":Date.now(),
                     "created_by":req.body.createdBy
                  };
                  education.push(record);
               }
               DB.UsersEducation.bulkCreate(education);
           }


           //Adding users experience.
           if (user?.id && req.body?.experience?.length>0) {
               let experience=[];
               for (let data of req.body.experience) {

                  let startDate=data?.startDate ? new Date(data.startDate).toISOString().split('T')[0] : null;
                  let endDate=data?.endDate ? new Date(data.endDate).toISOString().split('T')[0] : null;
                  let record={
                     "user_id":user?.id,
                     "company":data?.company.trim(),
                     "job_title":data?.jobTitle ? data.jobTitle.trim() : null,
                     "start_date":startDate,
                     "end_date":endDate,
                     "designation":data?.remarks ? data?.remarks.trim(): null,
                     "ctc":data?.remarks ? data?.remarks.trim() : null,
                     "reason_for_leaving":data?.remarks ? data?.remarks.trim() : null,
                     "status":1,
                     "created_at":Date.now(),
                     "created_by":req.body.createdBy
                  };
                  experience.push(record);
               }
               DB.UsersExperience.bulkCreate(experience);
           }



           //Adding curricular activity.
           if (user?.id && req.body?.curricularActivity?.length>0) {
               let curricular=[];
               for (let data of req.body.curricularActivity) {

                  let record={
                     "user_id":user?.id,
                     "activity_name":data?.activityName.trim(),
                     "period":data?.period ? data.period.trim() : null,
                     "level_of_involvement":data?.levelOfInvolvement ? data?.levelOfInvolvement.trim(): null,
                     "achivement":data?.achivement ? data?.achivement.trim() : null,
                     "status":1,
                     "created_at":Date.now(),
                     "created_by":req.body.createdBy
                  };
                  curricular.push(record);
               }
               DB.UsersCurricular.bulkCreate(curricular);
           }
       
        return response.success(res, "User has been successfully created");
    }catch(error) {
        return response.error(res, error.message);
    }
}


 //going to disable user.
 let disableUser=(req, res)=>{
   try {
      let disable=DB.User.update({
         "status":0
      },{
         where:{
            "id":req.params.id
      }});

      if (disable) {
         return response.success(res, message.disabled);
      }else {
         return response.error(res, message.serverError);
      }
   }catch(error) {
      return response.error(res, error.message);
   }
}

 //going to enable user.
 let enableUser=(req, res)=>{
   try {
      let disable=DB.User.update({
         "status":1
      },{
         where:{
            "id":req.params.id
      }});
      
      if (disable) {
         return response.success(res, message.enabled);
      }else {
         return response.error(res, message.serverError);
      }
   }catch(error) {
      return response.error(res, error.message);
   }
}

//going to enable user.
 let deleteUser=(req, res)=>{
   try {
      let deleteUser=DB.User.destroy({
         where:{
            "id":req.params.id
      }});
      
      if (deleteUser) {
         return response.success(res, message.deleted);
      }else {
         return response.error(res, message.serverError);
      }
   }catch(error) {
      return response.error(res, error.message);
   }
}

//going to restore user.
 let restoreUser=(req, res)=>{
   try {
      let restoreUser=DB.User.restore({
         where:{
            "id":req.params.id
      }});
      
      if (restoreUser) {
         return response.success(res, message.restored);
      }else {
         return response.error(res, message.serverError);
      }
   }catch(error) {
      return response.error(res, error.message);
   }
}

 //fetching user legal information.
   let getUserLegalInfo=async(userId)=>{
      return await DB.UsersLegal.findAll({
         where:{user_id:userId},
         attributes:['id', 'user_id', 'dl_no', 'dl_expiery_date', 'passport_no', 'passport_expiery_date',
            'work_permit_no', 'work_permit_expiery_date', 'status'
         ]
      });
   }

   //fetching user address information.
   let getUserAddress=async(userId)=>{
      return await DB.UsersAddress.findAll({
         where:{user_id:userId},
         attributes:['id', 'user_id', 'address_type', 'country_id', 'state_id', 'city_id', 'pincode',
            'address', 'status'
         ]
      });
   }

     //fetching user family information.
   let getUserFamily=async(userId)=>{
      return await DB.UsersFamily.findAll({
         where:{user_id:userId},
         attributes:['id', 'user_id', 'name', 'gender', 'relation', 'contact', 'status'
         ]
      });
   }

   //fetching user education information.
   let getUserEducation=async(userId)=>{
      return await DB.UsersEducation.findAll({
         where:{user_id:userId},
         attributes:['id', 'user_id', 'course', 'college', 'result', 'passing_year', 'remarks',
            'status'
         ]
      });
   }

   //fetching user experience information.
   let getUserExperience=async(userId)=>{
      return await DB.UsersExperience.findAll({
         where:{user_id:userId},
         attributes:['id', 'user_id', 'company', 'job_title', 'start_date', 'end_date', 'designation',
            'ctc', 'reason_for_leaving', 'status']
      });
   }

   //fetching user experience information.
   let getCurricularActivity=async(userId)=>{
      return await DB.UsersCurricular.findAll({
         where:{user_id:userId},
         attributes:['id', 'user_id', 'activity_name', 'period', 'level_of_involvement',
            'achivement', 'status']
      });
   }

//going to restore user.
 let getUserInfo=async(req, res)=>{
   try {
      let userInfo=await DB.User.findOne({where:{id:1},
         attributes:['id', 'user_code', 'company_id', 'user_type_id', 'saluation_id', 'blood_group_id',
            'designation_id', 'department_id', 'emp_category_id', 'employement_type_id', 'grade_id',
            'first_name', 'last_name', 'mobile', 'email', 'refrence_number', 'gender', 'dob',
            'place_of_birth', 'marrital_status', 'wedding_date', 'doj', 'biomatric_id', 'status',
            'approval_status_id'
         ]
      });
      let info={};
      if (userInfo) {
         info.id=userInfo.id;
         info.userCode=userInfo.user_code;
         info.companyId=userInfo.company_id;
         info.userTypeId=userInfo.user_type_id;
         info.saluationId=userInfo.saluation_id;
         info.bloodGroupId=userInfo.blood_group_id;
         info.designationId=userInfo.designation_id;
         info.departmentId=userInfo.department_id;
         info.empCategoryId=userInfo.emp_category_id;
         info.employementTypeId=userInfo.employement_type_id;
         info.gradeId=userInfo.grade_id;
         info.firstName=userInfo.first_name;
         info.lastName=userInfo.last_name;
         info.mobile=userInfo.mobile;
         info.email=userInfo.email;
         info.refrenceNumber=userInfo.refrence_number;
         info.gender=userInfo.gender;
         info.dob=userInfo.dob;
         info.placeOfBirth=userInfo.place_of_birth;
         info.marritalStatus=userInfo.marrital_status;
         info.weddingDate=userInfo.wedding_date;
         info.doj=userInfo.doj;
         info.biomatricId=userInfo.biomatric_id;
         info.status=userInfo.status;
         info.legal=await getUserLegalInfo(userInfo.id);
         info.address=await getUserAddress(userInfo.id);
         info.family=await getUserFamily(userInfo.id);
         info.education=await getUserEducation(userInfo.id);
         info.experience=await getUserExperience(userInfo.id);
         info.curricular=await getCurricularActivity(userInfo.id);
      }

      if (info?.id) {
         return response.success(res, message.recordFound, info);
      }else {
         return response.error(res);
      }
   }catch(error) {
      return response.error(res, error.message);
   }
}

//going to update user information.
let updateUserInfo=async(req, res)=>{

   //checking duplicate mobile number
   let checkMobile=await DB.User.findAndCountAll({where:{mobile:req.body.mobile.trim()}});
  
   if (checkMobile?.count && checkMobile?.rows[0]?.id!=req.body.userId) {
      return response.error(res, "Duplicate mobile number found.");
   }
   //checking duplicate email
   let checkEmail=await DB.User.findAndCountAll({where:{email:req.body.email.trim()}});
   if (checkEmail?.count && checkMobile?.rows[0]?.id!=req.body.userId) {
      return response.error(res, "Duplicate email found.");
   }
   
   const dob = req.body.dob ? new Date(req.body.dob).toISOString().split('T')[0] : null;
   const weddingDate = req.body.weddingDate ? new Date(req.body.weddingDate).toISOString().split('T')[0] : null;
   const doj = req.body.doj ? new Date(req.body.doj).toISOString().split('T')[0] : null;
    try {
        let user=await DB.User.update({
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
            "approval_status":1,
            "updated_at":Date.now(),
            "updated_by":req.body.createdBy,
          },{
            where:{id:req.body.userId}
          });

          //adding user work permit.
          if (user) {
            let dlExpiery=req.body?.legal?.dlExpieryDate ? new Date(req.body.legal.dlExpieryDate).toISOString().split('T')[0] : null;
            let passportExp=req.body?.legal?.passportExpDate ? new Date(req.body.legal.passportExpDate).toISOString().split('T')[0] : null;
            let workPermitExpDate=req.body?.legal?.workPermitExpDate ? new Date(req.body.legal.workPermitExpDate).toISOString().split('T')[0] : null;

            let checkLegal=await DB.UsersLegal.findOne({where:{user_id:parseInt(req.body.userId)}});
            if (checkLegal) {
               DB.UsersLegal.update({
                  "dl_no":req.body?.legal?.dlNo.trim(),
                  "dl_expiery_date":dlExpiery,
                  "passport_no":req.body?.legal?.passportNumber.trim(),
                  "passport_expiery_date":passportExp,
                  "work_permit_no":req.body?.legal?.workPermitNumber.trim(),
                  "work_permit_expiery_date":workPermitExpDate,
                  "updated_at":Date.now(),
                  "updated_by":req.body.createdBy,
               },{
                  where:{user_id:parseInt(req.body.userId)}
               });
            }else {
               DB.UsersLegal.create({
                "user_id":req.body.userId,
                "dl_no":req.body?.legal?.dlNo.trim(),
                "dl_expiery_date":dlExpiery,
                "passport_no":req.body?.legal?.passportNumber.trim(),
                "passport_expiery_date":passportExp,
                "work_permit_no":req.body?.legal?.workPermitNumber.trim(),
                "work_permit_expiery_date":workPermitExpDate,
                "status":1,
                "created_at":Date.now(),
                "created_by":req.body.createdBy,
             });
            }
          }

          //adding user addresses
          if (user && (req.body?.address?.length)) {

              for (let data of req.body.address) {
                let checkAdd=await DB.UsersAddress.findOne({where:[{user_id:req.body.userId},
                  {address_type:data.addressType}
                ]});
                if (checkAdd) {
                  DB.UsersAddress.update({
                    "address_type":validator.escape(data.addressType.trim()),
                    "country_id":data?.country ? data.country : null,
                    "state_id":data?.state ? data?.state : null,
                    "city_id":data?.city ? data?.city: null,
                    "pincode":data?.pincode ? validator.escape(data.pincode.trim()) : null,
                    "address":data?.address ? validator.escape(data.address.trim()) : null,
                    "updated_at":Date.now(),
                    "updated_by":req.body.createdBy
                 },{
                  where:[{id:data.addressId},{user_id:req.body.userId}]
                 });
                }else {
                  DB.UsersAddress.create({
                    "user_id":req.body.userId,
                    "address_type":validator.escape(data.addressType.trim()),
                    "country_id":data?.country ? data.country : null,
                    "state_id":data?.state ? data?.state : null,
                    "city_id":data?.city ? data?.city: null,
                    "pincode":data?.pincode ? validator.escape(data.pincode.trim()) : null,
                    "address":data?.address ? validator.escape(data.address.trim()) : null,
                    "status":1,
                    "created_at":Date.now(),
                    "created_by":req.body.createdBy
                 });
                }
              }
          }

          //adding user family.
           if (user && req.body?.family?.length>0) {
               let family=[];
               for (let data of req.body.family) {
                  let checkFamily=await DB.UsersFamily.findOne({where:[{id:data.familyId},{user_id:req.body.userId}]})
                  
                  if (checkFamily) {
                     DB.UsersFamily.update({
                        "name":data.name.trim(),
                        "gender":data?.gender ? data.gender.trim() : null,
                        "relation":data?.relation ? data?.relation.trim() : null,
                        "contact":data?.contact ? data?.contact.trim(): null,
                        "status":1,
                        "updated_at":Date.now(),
                        "updated_by":req.body.createdBy
                     },{
                        where:[{id:data.familyId},{user_id:req.body.userId}]}
                     );
                  }else {
                     DB.UsersFamily.create({
                        "user_id":req.body.userId,
                        "name":data.name.trim(),
                        "gender":data?.gender ? data.gender.trim() : null,
                        "relation":data?.relation ? data?.relation.trim() : null,
                        "contact":data?.contact ? data?.contact.trim(): null,
                        "status":1,
                        "created_at":Date.now(),
                        "created_by":req.body.createdBy
                     });
                  }
               }
           }

           //Adding users education.
           if (user && req.body?.education?.length>0) {;
               for (let data of req.body.education) {
                  let checkEdu=DB.UsersEducation.findOne({where:[{id:data.educationId},{user_id:req.body.userId}]});
                  if (checkEdu) {
                     DB.UsersEducation.update({
                        "course":data.course.trim(),
                        "college":data?.college ? data.college.trim() : null,
                        "result":data?.result ? data?.result.trim() : null,
                        "passing_year":data?.passingYear ? data?.passingYear.trim() : null,
                        "remarks":data?.remarks ? data?.remarks.trim() : null,
                        "updated_at":Date.now(),
                        "updated_by":req.body.createdBy
                     },{
                        where:[{id:data.educationId},{user_id:req.body.userId}]
                     });
                  }else {
                     DB.UsersEducation.bulkCreate({
                        "user_id":req.body.userId,
                        "course":data.course.trim(),
                        "college":data?.college ? data.college.trim() : null,
                        "result":data?.result ? data?.result.trim() : null,
                        "passing_year":data?.passingYear ? data?.passingYear.trim() : null,
                        "remarks":data?.remarks ? data?.remarks.trim() : null,
                        "status":1,
                        "created_at":Date.now(),
                        "created_by":req.body.createdBy
                     });
                  }
               }
           }


           //Adding users experience.
           if (user && req.body?.experience?.length>0) {
               for (let data of req.body.experience) {
                  let startDate=data?.startDate ? new Date(data.startDate).toISOString().split('T')[0] : null;
                  let endDate=data?.endDate ? new Date(data.endDate).toISOString().split('T')[0] : null;

                  let experience=await DB.UsersExperience.findOne({where:[{id:data.experienceId},{user_id:req.body.userId}]});
                  if (experience) {
                     DB.UsersExperience.update({
                        "user_id":req.body.userId,
                        "company":data?.company.trim(),
                        "job_title":data?.jobTitle ? data.jobTitle.trim() : null,
                        "start_date":startDate,
                        "end_date":endDate,
                        "designation":data?.remarks ? data?.remarks.trim(): null,
                        "ctc":data?.remarks ? data?.remarks.trim() : null,
                        "reason_for_leaving":data?.remarks ? data?.remarks.trim() : null,
                        "status":1,
                        "updated_at":Date.now(),
                        "updated_by":req.body.createdBy
                     },{
                        where:[{id:data.experienceId},{user_id:req.body.userId}]
                     });
                  }else {
                     DB.UsersExperience.create({
                        "user_id":req.body.userId,
                        "company":data?.company.trim(),
                        "job_title":data?.jobTitle ? data.jobTitle.trim() : null,
                        "start_date":startDate,
                        "end_date":endDate,
                        "designation":data?.remarks ? data?.remarks.trim(): null,
                        "ctc":data?.remarks ? data?.remarks.trim() : null,
                        "reason_for_leaving":data?.remarks ? data?.remarks.trim() : null,
                        "status":1,
                        "created_at":Date.now(),
                        "created_by":req.body.createdBy
                     });
                  }
               }
           }



           //Adding curricular activity.
           if (user && req.body?.curricularActivity?.length>0) {

               for (let data of req.body.curricularActivity) {
                  let activity=await DB.UsersExperience.findOne({where:[{id:data.activityId},{user_id:req.body.userId}]});
                  if (activity) {
                     DB.UsersCurricular.update({
                        "user_id":user?.id,
                        "activity_name":data?.activityName.trim(),
                        "period":data?.period ? data.period.trim() : null,
                        "level_of_involvement":data?.levelOfInvolvement ? data?.levelOfInvolvement.trim(): null,
                        "achivement":data?.achivement ? data?.achivement.trim() : null,
                        "updated_at":Date.now(),
                        "updated_by":req.body.createdBy
                     },{
                         where:[{id:data.activityId},{user_id:req.body.userId}]
                     });
                  }else {
                     DB.UsersCurricular.create({
                        "user_id":req.body.userId,
                        "activity_name":data?.activityName.trim(),
                        "period":data?.period ? data.period.trim() : null,
                        "level_of_involvement":data?.levelOfInvolvement ? data?.levelOfInvolvement.trim(): null,
                        "achivement":data?.achivement ? data?.achivement.trim() : null,
                        "status":1,
                        "created_at":Date.now(),
                        "created_by":req.body.createdBy
                     });
                  }
               }
           }

         return response.success(res, message.updated);
    }catch(error) {
        return response.error(res, message.serverError);
    }
}

module.exports={
   usersList,
    addUser,
    disableUser,
    enableUser,
    deleteUser,
    restoreUser,
    getUserInfo,
    updateUserInfo,
}