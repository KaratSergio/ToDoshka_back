import sendEmail from "../../helpers/sendEmail.js";

import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import needHelpSchema from "../../schemas/schemaNeedHelp.js";

import BadRequestError from "../../helpers/BadRequestError.js";

const { SUPPORT_EMAIL } = process.env;

const helpEmail = async (req, res) => {
  const { error, value } = needHelpSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    throw new BadRequestError(
      error.details.map((detail) => detail.message).join(", ")
    );
  }

  const { email, comment } = value;

  const needHelpEmail = {
    to: SUPPORT_EMAIL,
    from: email,
    subject: "Need help",
    html: `<p>Email: ${email}. <br> Comment: ${comment}</p>`,
  };

  await sendEmail(needHelpEmail);
  res.status(200).json({
    message: "Send help email successful",
  });
};

export default ctrlWrapper(helpEmail);
