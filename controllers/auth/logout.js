// import * as servicesAuth from "../../services/servicesAuth.js";

// const logout = async (req, res) => {
//   const { _id } = req.user;
//   await servicesAuth.updateUser({ _id }, { token: "" });
//   res.status(204).json({
//     message: "Logout success",
//   });
// };

// export default logout;

import User from "../../models/user.js";

const logout = async (req, res, next) => {
  const { user } = req;
  await User.findOneAndUpdate({ _id: user._id }, { accessToken: "" });
  res.status(204).json();
};

export default logout;
