let authService=require("../../service/Api/AuthService");

//going to sign in user.
let authUser=(req, res)=>{
    return authService.authUser(req, res);
}

//going to refresh token.
let refreshToken=(req, res)=>{
    return authService.refreshToken(req, res);
}

module.exports={
    authUser,
    refreshToken
}