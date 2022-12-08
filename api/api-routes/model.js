const express=require('express');
const {create,index}=require('../controllers/Model');
const router=express.Router();
router.route("/").post(create);
//router.route("/:modelId/").get(modelList);
router.get('/',index);
module.exports=router