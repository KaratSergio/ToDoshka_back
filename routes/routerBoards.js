import express from "express";

import addBoard from "../controllers/boards/addBoard.js";
import updateBoard from "../controllers/boards/updateBoard.js";
import deleteBoard from "../controllers/boards/deleteBoard.js";
import getBoardById from "../controllers/boards/getBoardById.js";
import getAllUserBoards from "../controllers/boards/getAllUserBoards.js";

import addUser from "../controllers/users/addUser.js";
import removeUser from "../controllers/users/removeUser.js";

import upload from "../middlewares/upload.js";
import isValidId from "../middlewares/isValidId.js";
import isAuthorized from "../middlewares/isAuthorized.js";

import validateBody from "../decorators/validateBody.js";
import boardSchemas from "../schemas/schemaBoard.js";

const routerBoards = express.Router();

routerBoards.get("/", isAuthorized, getAllUserBoards);

routerBoards.get("/:id", isAuthorized, isValidId, getBoardById);
// prettier-ignore
routerBoards.post("/", isAuthorized, validateBody(boardSchemas.addBoardSchema), addBoard);
// prettier-ignore
routerBoards.patch("/:id/add-user", isAuthorized, validateBody(boardSchemas.ownersSchema), addUser);
// prettier-ignore
routerBoards.patch("/:id/remove-user", isAuthorized, validateBody(boardSchemas.ownersSchema), removeUser);
// prettier-ignore
routerBoards.put("/:id", isAuthorized, upload.single("background"), isValidId, validateBody(boardSchemas.editBoardSchema), updateBoard);

routerBoards.delete("/:id", isAuthorized, isValidId, deleteBoard);

export default routerBoards;
