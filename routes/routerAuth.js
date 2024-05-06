import express from "express";

import login from "../controllers/auth/login.js";
import logout from "../controllers/auth/logout.js";
import register from "../controllers/auth/register.js";

import updateUser from "../controllers/users/updateUser.js";
import currentUser from "../controllers/users/currentUser.js";

import googleAuth from "../controllers/auth/googleAuth.js";
import googleRedirect from "../controllers/auth/googleRedirect.js";

import themeSwap from "../controllers/auth/themeSwap.js";
import helpEmail from "../controllers/helpEmail/helpEmail.js";

import upload from "../middlewares/upload.js";
import validateBody from "../decorators/validateBody.js";
import isAuthorized from "../middlewares/isAuthorized.js";

import authSchemas from "../schemas/schemaAuth.js";
import needHelpSchema from "../schemas/schemaNeedHelp.js";

const routerAuth = express.Router();

routerAuth.get("/google", googleAuth);

routerAuth.get("/google-redirect", googleRedirect);

routerAuth.get("/current", isAuthorized, currentUser);
// prettier-ignore
routerAuth.post("/register", validateBody(authSchemas.registerSchema), register);

routerAuth.post("/login", validateBody(authSchemas.loginSchema), login);

routerAuth.post("/logout", isAuthorized, logout);

routerAuth.post("/help", isAuthorized, validateBody(needHelpSchema), helpEmail);
// prettier-ignore
routerAuth.patch("/theme", isAuthorized, validateBody(authSchemas.updateTheme), themeSwap);
// prettier-ignore
routerAuth.put("/update", isAuthorized, upload.single("avatar"), validateBody(authSchemas.updateSchema), updateUser);

export default routerAuth;
