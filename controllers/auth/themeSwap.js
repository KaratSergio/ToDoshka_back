import User from "../../models/user.js";

import authSchema from "../../schemas/schemaAuth.js";

import BadRequestError from "../../helpers/BadRequestError.js";

const themeSwap = async (req, res, next) => {
  const { user } = req;
  const { value, error } = authSchema.updateTheme.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return next(new BadRequestError("Validation failed", error.details));
  }

  try {
    await User.findOneAndUpdate({ _id: user._id }, { theme: value.theme });
    res.json({ message: "Theme changed successfully" });
  } catch (err) {
    next(err);
  }
};

export default themeSwap;
