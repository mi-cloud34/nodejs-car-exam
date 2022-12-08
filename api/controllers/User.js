const httpStatus=require('http-status');
const {passwordToHash, generateAccessToken, generateRefreshToken}=require("../scripts/utils/helper");
const eventEmmiter=require("../scripts/events/eventEmmiter");
const {uploadFile,getFileStream, deleteImage}=require('../scripts/utils/s3Helper');
const User=require('../models/User')
const UserService=require("../services/User");
const userService=new UserService();
const CarService=require("../services/Car");
const carService=new CarService();
const PaymentService=require("../services/Payment");
const paymentService=new PaymentService();
const uuid = require("uuid").v1;
/*const pService=require("../services/Product");
const productService=new pService();*/

//const ProjectService=require("../services/Project");
//const projectService=new ProjectService();
const fs = require("fs");
 
const create= async (req,res)=> {
    
    req.body.password=passwordToHash(req.body.password);
   
    const file=req.files.image;
const key="user/photo/"+`${uuid()}${file.name}`;
const keys=`${uuid()}${file.name}`;

 console.log("fileimggggg",file);
uploadFile(file,key);
  await userService.create({
    ...req.body,
    image: keys
    //"http://localhost:3000/cars/" + uploadeImage.name,
  })
   .then((response)=>{
   
       res.status(httpStatus.CREATED).send(response)
   })
   .catch((e)=>res.status(httpStatus.BAD_REQUEST).send({err:"eksik bilgiler var"}))
   }
   const index=(req,res)=>{
    userService.list()
     .then((response)=>{
         res.status(httpStatus.CREATED).send(response)
     })
     .catch(e=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
    
     }
     const carList=(req,res)=>{
        carService.list({user_id:req.user?._id}).then(response=>{
            res.status(httpStatus.OK).send(response)
        }).catch(()=>{res.status(httpStatus.BAD_REQUEST).send({err:"kullanıcı aracları listelenirken hata cıktı"})})
     }
     const paymentList=(req,res)=>{
        paymentService.list({user_id:req.user?._id}).then(response=>{
            res.status(httpStatus.OK).send(response)
        }).catch(()=>{res.status(httpStatus.BAD_REQUEST).send({err:"kullanıcı ödemeleri listelenirken hata cıktı"})})
     }
     const login=(req,res)=>{
      req.body.password=passwordToHash(req.body.password); 
      userService.findOne(req.body)
      .then((user)=>{
      if (!user) return res.status(httpStatus.NOT_FOUND).send({message:"Böyle bi kullanıcı bulunamadı "});
      user={
          ...user.toObject(),
          tokens:{
              access_token:generateAccessToken(user),
              refresh_token:generateRefreshToken(user)
  
          }
      };
      delete user.password;
      res.status(httpStatus.OK).send(user)})
      .catch((e)=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({msg:"bilgileri kontrol edin"}));
  
  }
  const remov=async(req,res)=>{
    if(!req.params?.id){
        return res.status(httpStatus.BAD_REQUEST)
        .send({message:"böyle bir id bulunamadı"});
    }
    const id=req.params.id
  const post=await User.findOne({where: {id}})
 // const post=await carService.findOne({id:req.params.carId})
  // .then((response) => {
  //   res.status(httpStatus.CREATED).send(response);
  // })
  // .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  const post1='user/photo/'+post['image']            
   console.log("postttttt",post1);
  return ;
  deleteImage(post1)
    userService.delete(req.params.id).then((deleteditem)=>{
        if(!deleteditem){
            return res.status(httpStatus.BAD_REQUEST)
            .send({message:"böyle bir id bulunamadı"});
        }
        res.status(httpStatus.OK).send({
            message:"item silinmiştir"
        });
    }).catch(()=>res.status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({error:"kayıt sırasında hata cıktı"}))
}
/* const productlist=(req,res)=>{
  productService.list({user_id:req.user?._id}).then(response=>{
      res.status(httpStatus.OK).send(response)
  }).catch(()=>{res.status(httpStatus.BAD_REQUEST).send({err:"hata çıktı ptoje listelenirken"})})
} */
const resetpassword=(req,res)=>{

   const newpassword=uuid.v4()?.split("-")[0]||`usr-${new Date().getTime()}`
   userService.updateWhere({email:req.body.email},{password:passwordToHash(newpassword)})
   .then((updateUser)=>{
       if(!updateUser) return res.status(httpStatus.NOT_FOUND).send({err:"böyle bir kullanıcı bulunamadı"})
       
   console.log("güncel şifre:",updateUser);
   eventEmmiter.emit("send_email",{
       to:updateUser.email,
       subject:"şifre sıfırlama",
       html:`talebiniz üzerine bilgiler gonderilmiştir! <br/> yeni şifreniz:<b>${newpassword}</b>`
   });
   res.status(httpStatus.OK).send({
       message:"şifre sıfırlama işlemi için  sisteme kayıtlı e postanıza mesaj atılmıstır"
   })
})
   .catch(()=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({err:"şifre sıfırlanamadı"}));
}
const updateuser=(req,res)=>{
userService.update({ _id:req.user?._id},req.body)
.then((updateUser)=>{
res.status(httpStatus.OK).send(updateUser)
})
.catch(()=>{
   res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
       error:"Kullanıcı güncellenemdi"
   });
});
}
const changedpassword=(req,res)=>{
   req.body.password=passwordToHash(req.body.password);
   userService.update({ _id:req.user?._id},req.body)
   .then((updatepsw)=>{
   res.status(httpStatus.OK).send(updatepsw)
   })
   .catch(()=>{
       res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
           error:"Kullanıcı güncellenemdi"
       });
   });
   }
 module.exports={create,index,login,remov,changedpassword,updateuser,resetpassword,carList,paymentList}