const express=require('express');
const {create, index, remov, update,oneCar,getCarPhoto}=require('../controllers/Car');
const validate=require("../middlewares/validation");//validate middlewares
const schemas=require("../validations/User");//validation
const authenticate=require('../middlewares/authenticateToken');
const {upload}=require('../scripts/utils/fileHelper')
const router=express.Router();

router.get('/',index);
//router.get('/photo/:key',getCarPhoto);
router.get('/:carId',oneCar);
router.route("/").post(authenticate,create,upload);
router.route('/delete/:id').delete(remov);
router.route("/resetpassword").post(authenticate,create)
router.route("/").patch(authenticate,update);
module.exports=router