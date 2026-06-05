let DB=require("../models/index");


let generateUserCode=async()=> {
  let userCount=await DB.User.count();
  let counter= userCount ? userCount + 1 : 1;
  return "U" + String(counter++).padStart(9, "0");
}

module.exports={
    generateUserCode
}