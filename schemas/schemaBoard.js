import Joi from "joi";

import { email } from "../constants/regExp.js";
import { fieldRequired, emailInvalid } from "../constants/validMessage.js";

const addBoardSchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string(),
  background: Joi.string(),
});

const editBoardSchema = Joi.object({
  title: Joi.string(),
  icon: Joi.string(),
  background: Joi.string(),
});

const ownersSchema = Joi.object({
  email: Joi.string()
    .pattern(email)
    .required()
    .messages({
      "any.required": fieldRequired("email"),
      "string.pattern.base": emailInvalid,
    }),
});

const boardSchemas = { addBoardSchema, editBoardSchema, ownersSchema };

export default boardSchemas;
