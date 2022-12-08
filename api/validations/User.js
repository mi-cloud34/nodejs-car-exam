const Joi = require("joi");
const createValidation = Joi.object({
  name: Joi.string().required().min(3),
  password: Joi.string().required().min(8),
  email: Joi.string().required().min(8),
  role: Joi.string().required(),
  //email:Joi.array().unique("email")
});
const loginValidation = Joi.object({
  password: Joi.string().required().min(8),
  email: Joi.string().required().email().min(8),
});
const resetPasswordValidation = Joi.object({
  email: Joi.string().required().email().min(8),
});
const changePasswordValidation = Joi.object({
  password: Joi.string().required().min(8),
});
const updateValidation = Joi.object({
  full_name: Joi.string().min(3),
  password: Joi.string().min(8),
  email: Joi.string().min(8),
});
/* loginValidation=Joi.array().items(Joi.object().keys({
    password:Joi.string().required().min(8),
    email:Joi.string().required().email().min(8),
   }).unknown(true)).unique((a, b) => a.email === b.email) */
module.exports = {
  createValidation,
  loginValidation,
  updateValidation,
  resetPasswordValidation,
  changePasswordValidation
};
