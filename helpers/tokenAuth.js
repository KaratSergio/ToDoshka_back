import jwt from "jsonwebtoken";

const tokenAuth = function () {
  const payload = { id: this._id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default tokenAuth;
