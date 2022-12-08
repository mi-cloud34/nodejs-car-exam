const S3  = require("aws-sdk/clients/s3");

//const {uniqkey}=require('./uniq');
//const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const  crypto = require('crypto')
const sharp=require('sharp')
const uuid = require("uuid").v1;
const fs=require('fs');
const { SHA384 } = require("crypto-js");
require("dotenv").config();

//const generateFileName = (bytes = 8) =>{return crypto.randomBytes(bytes).toString('hex')}

// console.log("generateeee",generateFileName());

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
})
 uploadFile = async(file,key)=>{
 // const fileStream = fs.createReadStream(file.path);
const fileBuffer = await sharp(file.data)
   .resize({ height: 400, width: 600, fit: "contain" })
   .toBuffer()
   console.log("filesssss",fileBuffer);
  //const imgurl=key+`${uuid()}.${file.name}`;
  //const imgurl=key+`${generateFileName()}.${file.name}`;
  //console.log("keysss",key);
  //console.log("imgaUrlllllll",file.body._id);
 const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key:key,
    Body: fileBuffer 
}
 s3.upload(params, (error, data) => {
    if(error){
        res.status(500).send(error)
    }
    res.status(200).send(data)
}).promise();

//await unlinkFile(req.file.path);

  //return await Promise.all(params.map((param) => s3.upload(param).promise()));
};
getFileStream=(fileKey)=>{

  const downloadParams = {
    Key:fileKey,
    Bucket: process.env.AWS_BUCKET_NAME,
    //Prefix:'cars/photo/'
  };
  const datam= s3.getObject(downloadParams).createReadStream();
  return datam;
//   console.log("keysssss",fileKey);
//    const downloadParams = {
//   Key:fileKey,
//   Bucket: process.env.AWS_BUCKET_NAME,
//   //Prefix:process.env.AWS_BUCKET_NAME+'cars/photo/'
// };
// const datam=await s3.getObject(downloadParams).promise();
// console.log("carssssss",datam); 
// return datam;
/* s3.listObjectsV2({
  Bucket: process.env.AWS_BUCKET_NAME,
  MaxKeys: 1,
  Prefix:process.env.AWS_BUCKET_NAME+'cars/photo/'
}, function(err, data) {
  if (err) throw err;

  const objectExists = data.Contents.length > 0
  console.log(objectExists);
}); */
//

}
deleteImage=(imageName)=>{
  const deleteParams = {
    Bucket: bucketName,
    Key:imageName,
  }

  return s3.send(new DeleteObjectCommand(deleteParams))
}
module.exports={uploadFile,getFileStream,deleteImage}
/* exports.s3Uploadv2 = async (files) => {
  const s3 = new S3();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
}; */

/* exports.s3Uploadv3 = async (files) => {
  const s3client = new S3Client();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(
    params.map((param) => s3client.send(new PutObjectCommand(param)))
  );
}; */