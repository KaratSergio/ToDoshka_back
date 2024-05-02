import express from "express";

import { getNeedHelpEmail } from "../controllers/helpEmail/helpEmail.js";

import needHelpSchema from "../schemas/schemaNeedHelp.js";
import validateBody from "../decorators/validateBody.js";

const routerEmail = express.Router();

routerEmail.post("/", validateBody(needHelpSchema), getNeedHelpEmail);

export default routerEmail;
