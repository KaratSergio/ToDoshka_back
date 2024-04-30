import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

const addTaskSchema = Joi.object({
// write the code here
});

const editTaskSchema = Joi.object({
// write the code here
});

const taskSchemas = { addTaskSchema, editTaskSchema };

export default taskSchemas;
