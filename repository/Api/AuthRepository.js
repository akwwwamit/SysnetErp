const jwt = require('jsonwebtoken');
let DB = require("../../models/index");
let response = require("../../library/Response");
let message = require("../../library/Message");
let { Op } = require("sequelize");
const validator = require("validator");
const bcrypt = require('bcrypt');
require('dotenv').config();

let authUser=async (req, res)=>{

    let userName=validator.escape(req.body.username);
    let password=validator.escape(req.body.password);

    const user = await DB.User.findOne({
        where: {
            [Op.or]:[
             {user_code:userName},
             {mobile:userName},
             {email:userName}
            ]
        },
        attributes:['id', 'user_code', 'company_id', 'designation_id', 'department_id', 'emp_category_id',
            'employement_type_id', 'grade_id', 'first_name', 'last_name', 'mobile', 'email', 'password',
            'refrence_number', 'gender', 'dob', 'place_of_birth', 'marrital_status', 'wedding_date', 'doj',
            'biomatric_id', 'status', 'approval_status_id', 'created_at', 'created_by'
        ]
    });

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: "1d",
            });
            let info={
                userInfo:user,
                token:token
            }
            return response.success(res, "Successfully loggedin.", info);
        }else {
            return response.error(res, "Please check your password");
        }
    }else {
        return response.error(res, "Please check your username and password");
    }
}
module.exports={
    authUser
}