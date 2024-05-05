import jwt from "jsonwebtoken";

import HttpError from "../helpers/HttpError.js";

import User from "../models/user.js";

const { JWT_SECRET } = process.env;

const isAuthorized = async (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    console.log("Authorization header not found");

    return next(HttpError(401, "Authorization header not found"));
  }

  console.log(`Authorization header: ${authorization}`);

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401, "Bearer or token not found"));
  }
  try {
    const isValidToken = jwt.verify(token, JWT_SECRET);

    console.log(`Token verified, ID: ${isValidToken.id}`);

    const user = await User.findOne({ _id: isValidToken.id });
    if (!user || token !== user.accessToken || !user.accessToken)
      throw HttpError(401, "User not found");

    req.user = user;
    next();
  } catch (error) {
    console.error(`Token verification error: ${error.message}`);
    if (
      error.message === "invalid signature" ||
      error.message === "jwt expired" ||
      error.message === "jwt must be provided"
    ) {
      error.status = 401;
      error.message = "Unauthorized";
    }
    next(HttpError(401));
  }
};

export default isAuthorized;
