const express=require('express');
const {create,index}=require('../controllers/Color');
const authenticate=require('../middlewares/authenticateToken');
const router=express.Router();
router.route("/").post(create);
//router.route("/:modelId/").get(modelList);
router.get('/',index);
router.post('/',authenticate,create);
module.exports=router