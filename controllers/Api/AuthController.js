let authService=require("../../service/Api/AuthService");

let authUser=(req, res)=>{
    return authService.authUser(req, res);
}

module.exports={
    authUser
}