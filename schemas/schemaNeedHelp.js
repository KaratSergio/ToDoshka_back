import Joi from "joi";

import { email } from "../constants/regExp.js";

const needHelpSchema = Joi.object({
  email: Joi.string().pattern(email).required(),
  comment: Joi.string(),
});

export default needHelpSchema;
