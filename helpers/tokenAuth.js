import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
};
