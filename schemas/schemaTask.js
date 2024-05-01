import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

const addTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  column: Joi.objectId().required(),
  priority: Joi.string().valid("without", "low", "medium", "high"),
  deadline: Joi.date(),
});

// column: Joi.string().required(),


const editTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid("without", "low", "medium", "high"),
  deadline: Joi.date(),
});

const taskSchemas = { addTaskSchema, editTaskSchema };

export default taskSchemas;
