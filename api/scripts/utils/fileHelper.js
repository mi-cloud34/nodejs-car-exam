
const multer=require('multer');
const { S3 } = require("aws-sdk");
//const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const sharp=require('sharp')
const uuid = require("uuid").v4;


require("dotenv").config();
upload=async()=>{ 
    const storage = multer.memoryStorage({
        destination: function(req, file, callback) {
            callback(null, '')
        }
    });
    //multer({ dest: "uploads/" });
    /*  multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
  }) */
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
      cb(null, true);
    } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
  };
  const upload = multer({storage,fileFilter}).single('image')
  return upload;
}

module.exports={upload}