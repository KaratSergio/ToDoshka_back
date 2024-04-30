import express from "express";

import addBoard from "../controllers/boards/addBoard.js";
import updateBoard from "../controllers/boards/updateBoard.js";
import deleteBoard from "../controllers/boards/deleteBoard.js";
import getBoardById from "../controllers/boards/getBoardById.js";
import getAllUserBoards from "../controllers/boards/getAllUserBoards.js";

import addUser from "../controllers/users/addUser.js";
import removeUser from "../controllers/users/removeUser.js";

import isValidId from "../middlewares/isValidId.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const routerBoards = express.Router();

routerBoards.get("/", isAuthorized, getAllUserBoards);

routerBoards.get("/:id", isAuthorized, isValidId, getBoardById);

routerBoards.post("/", isAuthorized, addBoard);

routerBoards.patch("/:id/add-user", isAuthorized, addUser);

routerBoards.patch("/:id/remove-user", isAuthorized, removeUser);

routerBoards.put("/:id", isAuthorized, isValidId, updateBoard);

routerBoards.delete("/:id", isAuthorized, isValidId, deleteBoard);

export default routerBoards;
