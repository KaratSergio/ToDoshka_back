import Joi from "joi";

import { email } from "../constants/regExp.js";
import { icons, backgrounds } from "../constants/uiConstants.js";
import { fieldRequired, emailInvalid } from "../constants/validMessage.js";

const addBoardSchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string().valid(...icons),
  background: Joi.string().valid(...backgrounds),
});

const editBoardSchema = Joi.object({
  title: Joi.string(),
  icon: Joi.string().valid(...icons),
  background: Joi.string().valid(...backgrounds),
});

const boardSchemas = { addBoardSchema, editBoardSchema };

export default boardSchemas;
