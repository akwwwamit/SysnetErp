let userService=require("../../service/Api/UserService");

let usersList=(req, res)=>{
    return userService.usersList(req, res);
}

let addUser=(req, res)=>{
    return userService.addUser(req, res);
}
module.exports={
    usersList,
    addUser
}