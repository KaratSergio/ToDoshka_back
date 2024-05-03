import Joi from "joi";

import { themes } from "../constants/uiConstants.js";
import { name, email, password } from "../constants/regExp.js";

import {
  fieldRequired,
  nameInvalid,
  emailInvalid,
  passwordInvalid,
} from "../constants/validMessage.js";

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(email)
    .required()
    .messages({
      "any.required": fieldRequired("email"),
      "string.pattern.base": emailInvalid,
    }),
  password: Joi.string()
    .min(6)
    .max(64)
    .pattern(password)
    .required()
    .messages({
      "any.required": fieldRequired("password"),
      "string.pattern.base": passwordInvalid,
    }),
});

const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(32)
    .pattern(name)
    .required()
    .messages({
      "any.required": fieldRequired("name"),
      "string.pattern.base": nameInvalid,
    }),
  email: Joi.string()
    .pattern(email)
    .required()
    .messages({
      "any.required": fieldRequired("email"),
      "string.pattern.base": emailInvalid,
    }),
  password: Joi.string()
    .min(6)
    .max(64)
    .pattern(password)
    .required()
    .messages({
      "any.required": fieldRequired("password"),
      "string.pattern.base": passwordInvalid,
    }),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(32).pattern(name).messages({
    "string.pattern.base": nameInvalid,
  }),
  email: Joi.string().min(2).max(32).pattern(email).messages({
    "string.pattern.base": emailInvalid,
  }),
  password: Joi.string().min(2).max(32).pattern(password).allow(null).messages({
    "string.pattern.base": passwordInvalid,
  }),
});

const updateTheme = Joi.object({
  theme: Joi.string()
    .valid(...themes)
    .insensitive()
    .required()
    .messages({
      "any.required": fieldRequired("theme"),
      "any.only": `Theme field must be one of the next value - ${themes.join(
        ", "
      )}`,
    }),
});

const authSchemas = { loginSchema, registerSchema, updateSchema, updateTheme };

export default authSchemas;
