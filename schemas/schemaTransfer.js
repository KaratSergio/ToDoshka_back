import Joi from "joi";

const transferSchema = Joi.object({
  source: Joi.object({
    index: Joi.number(),
    transferId: Joi.string().required(),
  }),
  destination: Joi.object({
    index: Joi.number().required(),
    transferId: Joi.string().required(),
  }),
});

export default transferSchema;
