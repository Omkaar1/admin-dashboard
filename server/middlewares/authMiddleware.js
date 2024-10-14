const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": `"name" cannot be empty`,
      "string.min": `"name" should be at least 3 characters long`,
      "string.max": `"name" should not exceed 100 characters`,
      "any.required": `"name" is required`,
    }),
    email: Joi.string().email().required().messages({
      "string.empty": `"email" cannot be empty`,
      "string.email": `"email" must be a valid email address`,
      "any.required": `"email" is required`,
    }),
    password: Joi.string().min(6).max(100).required().messages({
      "string.empty": `"password" cannot be empty`,
      "string.min": `"password" should be at least 6 characters long`,
      "string.max": `"password" should not exceed 100 characters`,
      "any.required": `"password" is required`,
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": `"email" cannot be empty`,
      "string.email": `"email" must be a valid email address`,
      "any.required": `"email" is required`,
    }),
    password: Joi.string().min(6).max(100).required().messages({
      "string.empty": `"password" cannot be empty`,
      "string.min": `"password" should be at least 6 characters long`,
      "string.max": `"password" should not exceed 100 characters`,
      "any.required": `"password" is required`,
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

module.exports = { signupValidation, loginValidation };
