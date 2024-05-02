import sendEmail from "../../helpers/sendEmail.js";

const { SUPPORT_EMAIL } = process.env;

export const getNeedHelpEmail = async (req, res) => {
  const { email, comment } = req.body;

  const needHelpEmail = {
    to: SUPPORT_EMAIL,
    subject: "Need help",
    html: `<p>Email: ${email}. <br> Comment: ${comment}</p>`,
  };

  await sendEmail(needHelpEmail);

  const helpEmailResponse = {
    to: email,
    subject: "Support response",
    html: `<p>Thank you for your request. We will consider your question in the near future.</p>`,
  };
  await sendEmail(helpEmailResponse);

  res.status(200).json({
    message: "Send help email successful",
  });
};
