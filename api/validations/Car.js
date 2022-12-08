const Joi = require("joi");
const createValidation = Joi.object({
  carname: Joi.string().required().min(3),
  modelId: Joi.string().required().min(10),
  yearId: Joi.string().required().min(10),
  colorId: Joi.string().required().min(10),
  kmId: Joi.string().required().min(10),
  price: Joi.number().required().min(3),
  lt: Joi.number().required().min(3),
  lg: Joi.number().required().min(3),
});

const updateValidation = Joi.object({
 
});
module.exports = {
  createValidation,
  updateValidation,
};
