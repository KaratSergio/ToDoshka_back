import Joi from "joi";

const addBoardSchema = Joi.object({
// write the code here
});

const editBoardSchema = Joi.object({
// write the code here
});

const ownersSchema = Joi.object({
// write the code here
});

const boardSchemas = { addBoardSchema, editBoardSchema, ownersSchema };

export default boardSchemas;
