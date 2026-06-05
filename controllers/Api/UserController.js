let userService=require("../../service/Api/UserService");
//fetching users list
let usersList=(req, res)=>{
    return userService.usersList(req, res);
}

//adding new users.
let addUser=(req, res)=>{
    return userService.addUser(req, res);
}

//disabling user.
let disableUser=(req, res)=>{
    return userService.disableUser(req, res);
}

//enabling user.
let enableUser=(req, res)=>{
    return userService.enableUser(req, res);
}

//enabling user.
let deleteUser=(req, res)=>{
    return userService.deleteUser(req, res);
}

//restoring user.
let restoreUser=(req, res)=>{
    return userService.restoreUser(req, res);
}

//fetching user info.
let getUserInfo=(req, res)=>{
    return userService.getUserInfo(req, res);
}

//updating user information.
let updateUserInfo=(req, res)=>{
    return userService.updateUserInfo(req, res);
}

module.exports={
    usersList,
    addUser,
    disableUser,
    enableUser,
    deleteUser,
    restoreUser,
    getUserInfo,
    updateUserInfo
}