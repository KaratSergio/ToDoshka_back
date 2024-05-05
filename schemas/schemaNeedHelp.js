import Joi from "joi";

import { email } from "../constants/regExp.js";

import { fieldRequired, emailInvalid } from "../constants/validMessage.js";

const needHelpSchema = Joi.object({
  email: Joi.string()
    .pattern(email)
    .required()
    .messages({
      "any.required": fieldRequired("email"),
      "string.pattern.base": emailInvalid,
    }),
  comment: Joi.string()
    .min(10)
    .max(240)
    .required()
    .messages({
      "any.required": fieldRequired("comment"),
      "string.min": `Comment should have a minimum length of {#limit} symbols`,
      "string.max": `Comment should have a maximum length of {#limit} symbols`,
    }),
});

export default needHelpSchema;
