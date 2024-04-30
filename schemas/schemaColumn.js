import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

const addColumnSchema = Joi.object({
// write the code here
});

const editColumnSchema = Joi.object({
// write the code here
});

const columnSchemas = { addColumnSchema, editColumnSchema };

export default columnSchemas;
