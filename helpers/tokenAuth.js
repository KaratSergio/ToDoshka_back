import jwt from "jsonwebtoken";

// const { JWT_SECRET } = process.env;

// export const generateToken = (payload) => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
// };

const signToken = function () {
  const payload = { id: this._id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default signToken;
