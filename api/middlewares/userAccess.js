const httpStatus=require('http-status');
const Service=require("../services/User");
const userService=new Service();
const userAccess= (req,res,next)=>{
    userService.findOne(req.user)
      .then((kullanici)=>{
          console.log("kullanici:"+kullanici);
    if (kullanici.role!=="userr")  
    return res.status(httpStatus.FORBIDDEN).send({error:"Yalnızca kullanıcılar bu işlemi gercekleştirebilir"});

    next();
})
}
module.exports=userAccess;