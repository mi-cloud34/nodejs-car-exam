const httpStatus = require("http-status");
const CarouselService = require("../services/Carousel");
const carouselService = new CarouselService();
const path=require('path');
const fs = require("fs");

const create = (req, res) => {
 
  console.log("resmimmmmm" + req.files.carimage);
  const uploadDir = "public/carouselimg";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadeImage = req.files.crlimg;
  let uploadPath = __dirname + "/../../public/carouselimg/" + uploadeImage.name;
  const uploadProc = uploadeImage.mv(uploadPath);
  carouselService
    .create({
      ...req.body,
      crlimg: "http://localhost:3000/carousel/" + uploadeImage.name,
    })
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};
const index =async (req, res) => {
 await carouselService
    .list()
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
     
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};


module.exports = { create, index};
