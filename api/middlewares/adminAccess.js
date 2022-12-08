const httpStatus=require('http-status');
const Service=require("../services/User");
const userService=new Service();
const adminAcces=async (req,res,next)=>{
    userService.findOne(req.user)
      .then((user)=>{
    if (user.role!=="admin")  return res.status(httpStatus.FORBIDDEN).send({error:"Yalnızca Adminler bu işlemi gercekleştirebilir"});

    next();
}) 
}
module.exports=adminAcces;