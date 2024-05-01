import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

const addColumnSchema = Joi.object({
  title: Joi.string().required(),
  board: Joi.string().required(),
});

const editColumnSchema = Joi.object({
  title: Joi.string().required(),
});

const columnSchemas = { addColumnSchema, editColumnSchema };

export default columnSchemas;
