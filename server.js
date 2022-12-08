const express=require('express');
const fileUpload=require("express-fileupload")
const helmet=require('helmet');
const cors=require('cors');
const mongoose=require('mongoose');
const loaders=require('./api/loaders');
const {UserRoutes,CarRoutes,ColorRoutes,PaymentRoutes,KmRoutes,ModelRoutes,YearRoutes,CarouselRoutes}=require('./api/api-routes/index');
const events=require("./api/scripts/events");
//const errorHandler=require('./middlewares/errorHandler');
const path=require("path");
const config=require("./config");
const {getFileStream} =require('./api/scripts/utils/s3Helper');
const fs = require("fs");

const util = require("util");

const app=express();
app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      
    })
  );
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      // ...
    })
  );
  app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
app.use("/public/carimg",express.static(path.join(__dirname,"./public")))
/* app.get("/cars/img/:fileName",(req,res)=>{
    res.sendFile(path.join(__dirname,`./public/carimg/${req.params.fileName}`))
}) */ 

// app.get("/cars/photo/:key",async(req, res) => {

//   const key = req.params.key;

//   console.log(req.params.key);

//   const data =await  getFileStream(key);
// //   res.writeHead(200, {'Content-Type': 'image/jpeg'});
// //   res.write(data.Body, 'binary');
// //   res.end(null, 'binary');
// //  res.attachment(key); // this line will make image readable
// //  res.type(data.ContentType);
// //  res.send(data.Body);
// data.pipe(res);
// });
app.get("/user/photo/:key",  (req, res) => {

  const key = 'user/photo/' + req.params.key
  const readStream = getFileStream(key);
  
    readStream.pipe(res);  // this line will make image readable
  });
app.use("/public/carouselimg",express.static(path.join(__dirname,"./public")))

app.get("/carousel/:fileName",(req,res)=>{
    res.sendFile(path.join(__dirname,`./public/carouselimg/${req.params.fileName}`))
})
app.use("/public/profilimg",express.static(path.join(__dirname,"./public")))

app.get("/user/fileName",(req,res)=>{
    res.sendFile(path.join(__dirname,`./public/profilimg/${req.params.fileName}`))
})
config();
loaders();
events();
app.use(express.json());
app.use(helmet());
app.use(fileUpload());
app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    })
  );
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      // ...
    })
  );
app.listen(process.env.APP_PORT,()=>{
    console.log('sunucu ayaga kalktı');
    app.use("/cars",CarRoutes);
    app.use("/user",UserRoutes);
    app.use("/payment",PaymentRoutes);
    app.use("/color",ColorRoutes);
    app.use("/model",ModelRoutes);
    app.use("/year",YearRoutes);
    app.use("/km",KmRoutes);
    app.use("/carousel",CarouselRoutes)
    
});

