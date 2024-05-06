import sendEmail from "../../helpers/sendEmail.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const { SUPPORT_EMAIL } = process.env;

const helpEmail = async (req, res) => {
  const { email, comment } = req.body;

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
