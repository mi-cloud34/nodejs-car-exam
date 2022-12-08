const Joi = require("joi");
const createValidation = Joi.object({
  personname: Joi.string().required().min(3),
  cardnumber: Joi.number().required().min(12),
  cvv: Joi.number().required().min(3),
  
});

const updateValidation = Joi.object({
 
});
module.exports = {
  createValidation,
  updateValidation,
};
