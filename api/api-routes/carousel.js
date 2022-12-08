const express=require('express');
const {create,index}=require('../controllers/Carousel');
const router=express.Router();
router.route("/").post(create);
router.get('/',index);
module.exports=router