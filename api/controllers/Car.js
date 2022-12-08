const httpStatus = require("http-status");
const CarService = require("../services/Car");
const Car=require('../models/Car')
const carService = new CarService();
require("dotenv").config();
const path=require('path');
const uuid = require("uuid").v1;
const fs = require("fs");
const {uploadFile,getFileStream, deleteImage}=require('../scripts/utils/s3Helper');
const create = (req, res) => {
  req.body.userId = req.user;
 
 
const file=req.files.carimage;
const key="cars/photo/"+`${uuid()}${file.name}`;
const keys=`${uuid()}${file.name}`;

 console.log("fileimggggg",file);
uploadFile(file,key);
/* const imageName=generateFileName();
 console.log("filessssssss",imageName); */
  carService
    .create({
      ...req.body,
      //carimage: "http://localhost:3000/cars/" + file.name,
      carimage:keys,
    })
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};
const getCarPhoto=(req,res)=>{
  const key = 'cars/photo/' + req.params.key
const readStream = getFileStream(key);

  readStream.pipe(res);
}
const index =async (req, res) => {
  
  if (req.query.modelId) {
    carService
    .list({modelId:req.query.modelId })
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
   if (req.query.kmId) {
    carService
    .list({kmId:req.query.kmId })
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
   if (req.query.colorId) {
    console.log("colorıdddd",req.query.colorId);
    carService
    .list({colorId:req.query.colorId })
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
  if (req.query.yearId) {
    carService
    .list({yearId:req.query.yearId })
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }
   else{
    carService
    .list()
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
   }
};
const oneCar=async(req,res)=>{
   if (!(req.params.carId)) return res.status(httpStatus.BAD_REQUEST).send({ message: "id bilgisi eksik" });
   if(req.params.carId){
  carService.findOne({id:req.params.carId})
   .then((response) => {
    response['carimage']= process.env.AWS_URL+ process.env.AWS_BUCKET_NAME+'/cars/photo/'+response['carimage']
    res.status(httpStatus.CREATED).send(response);
  })
  .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));                      }
}
 /* const categoryList = (req, res) => {
  const { id } = req.params;
  console.log(id)
  if (!id) return res.status(httpStatus.BAD_REQUEST).send({ message: "id bilgisi eksik" });
  carService
    .categorylist({id: new Schema.ObjectId(req.params.id)})
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};  */
/*const kmList = (req, res) => {
  const { kmId } = req.params;
  console.log(kmId);

  if (!kmId)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "id bilgisi eksik" });

  carService
    .kmlist({kmId })
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
const colorList = (req, res) => {
  const { colorId } = req.params;
  console.log(colorId);

  if (!colorId)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "id bilgisi eksik" });

  carService
    .colorlist({ colorId })
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
const yearList = (req, res) => {
  const { yearId } = req.params;
  console.log(yearId);

  if (!yearId)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "id bilgisi eksik" });

  carService
    .yearlist({ yearId })
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
*/
const remov = async(req, res) => {
  if (!req.params?.id) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "böyle bir id bulunamadı" });
  }
  const id=req.params.carId
  const post=await Car.findOne({where: {id}})
 // const post=await carService.findOne({id:req.params.carId})
  // .then((response) => {
  //   res.status(httpStatus.CREATED).send(response);
  // })
  // .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  const post1='cars/photo/'+post['carimage']            
   console.log("postttttt",post1);
  
  deleteImage(post1)
  carService
    .delete(req.params.id)
    .then((deleteditem) => {
      if (!deleteditem) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "böyle bir id bulunamadı" });
      }
      res.status(httpStatus.OK).send({
        message: "item silinmiştir",
      });
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "kayıt sırasında hata cıktı" })
    );
};

const update = (req, res) => {
  carService
    .update({ _id: req.user?._id }, req.body)
    .then((updateUser) => {
      res.status(httpStatus.OK).send(updateUser);
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "Kullanıcı güncellenemdi",
      });
    });
};

module.exports = { create, index, remov, update,oneCar,getCarPhoto};
 /*  console.log("resmimmmmm" + req.files.carimage);
  const uploadDir = "public/carimg";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadeImage = req.files.carimage;
  let uploadPath = __dirname + "/../../public/carimg/" + uploadeImage.name;
  const uploadProc = uploadeImage.mv(uploadPath); */