const express=require('express');
const {create,index,login,remov,changedpassword,updateuser,resetpassword,carList,paymentList}=require('../controllers/User');
const validate=require("../middlewares/validation");//validate middlewares
const schemas=require("../validations/User");//validation
const authenticate=require('../middlewares/authenticateToken');
const router=express.Router();
router.get('/',index);
router.route("/").post(validate(schemas.createValidation),create);
router.route("/login").post(validate(schemas.loginValidation),login);
router.route('/:id').delete(authenticate,remov);
//router.route('/updateimage').post(authenticate,updateProfileImage);
router.route("/resetpassword").post(validate(schemas.resetPasswordValidation),resetpassword)
router.route("/").patch(authenticate,validate(schemas.updateValidation),updateuser);
router.route("/changepassword").post(authenticate,validate(schemas.changePasswordValidation),changedpassword)
router.route("/carlist").get(authenticate,carList)
router.route("/paymentlist").get(authenticate,paymentList)

module.exports=router