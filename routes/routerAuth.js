import express from "express";

import theme from "../controllers/auth/theme.js";

import login from "../controllers/auth/login.js";
import logout from "../controllers/auth/logout.js";
import register from "../controllers/auth/register.js";

import updateUser from "../controllers/users/updateUser.js";
import currentUser from "../controllers/users/currentUser.js";

import googleAuth from "../controllers/auth/googleAuth.js";
import googleRedirect from "../controllers/auth/googleRedirect.js";

import upload from "../middlewares/upload.js";
import isAuthorized from "../middlewares/isAuthorized.js";

import authSchemas from "../schemas/schemaAuth.js";

import validateBody from "../decorators/validateBody.js";

const { registerSchema } = authSchemas;

const routerAuth = express.Router();

routerAuth.get("/google", googleAuth);

routerAuth.get("/google-redirect", googleRedirect);

routerAuth.get("/current", isAuthorized, currentUser);

routerAuth.post("/register", validateBody(registerSchema), register);

routerAuth.post("/login", login);

routerAuth.post("/logout", isAuthorized, logout);

routerAuth.patch("/theme", isAuthorized, theme);

routerAuth.put("/update", isAuthorized, upload.single("avatar"), updateUser);

export default routerAuth;
