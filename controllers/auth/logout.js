import * as servicesAuth from "../../services/servicesAuth.js";

const logout = async (req, res) => {
  const { _id } = req.user;
  await servicesAuth.updateUser({ _id }, { token: "" });
  res.status(204).json({
    message: "Logout success",
  });
};

export default logout;
