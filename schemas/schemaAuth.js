import Joi from "joi";

const loginSchema = Joi.object({
// write the code here
});

const registerSchema = Joi.object({
// write the code here
});

const updateSchema = Joi.object({
// write the code here
});

const updateTheme = Joi.object({
// write the code here
});

const authSchemas = { loginSchema, registerSchema, updateSchema, updateTheme };

export default authSchemas;
