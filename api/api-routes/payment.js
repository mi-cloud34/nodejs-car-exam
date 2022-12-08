const express=require('express');
const {create,index}=require('../controllers/Payment');
const validate=require("../middlewares/validation");//validate middlewares
const authenticate=require('../middlewares/authenticateToken')
const schemas=require("../validations/Payment");//validation
const adminAccess=require("../middlewares/adminAccess");
const router=express.Router();
router.route("/").get(authenticate,index)
router.route("/:carId").post(authenticate,create);
module.exports=router