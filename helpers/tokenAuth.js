import jwt from "jsonwebtoken";

const signToken = function () {
  const payload = { id: this._id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default signToken;
