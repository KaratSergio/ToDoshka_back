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
import isAuthorized from "../middlewares/isAuthorized.js";

const routerAuth = express.Router();

routerAuth.get("/google", googleAuth);

routerAuth.get("/google-redirect", googleRedirect);

routerAuth.get("/current", isAuthorized, currentUser);

routerAuth.post("/register", register);

routerAuth.post("/login", login);

routerAuth.post("/logout", isAuthorized, logout);

routerAuth.post("/help", isAuthorized, helpEmail);

routerAuth.patch("/theme", isAuthorized, themeSwap);

routerAuth.put("/update", isAuthorized, upload.single("avatar"), updateUser);

export default routerAuth;
