import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

const addTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  column: Joi.objectId().required(),
});

const editTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});

const taskSchemas = { addTaskSchema, editTaskSchema };

export default taskSchemas;
