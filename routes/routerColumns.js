import express from "express";

import isValidId from "../middlewares/isValidId.js";
import isAuthorized from "../middlewares/isAuthorized.js";

import addColumn from "../controllers/columns/addColumn.js";
import updateColumn from "../controllers/columns/updateColumn.js";
import deleteColumn from "../controllers/columns/deleteColumn.js";
import transferColumn from "../controllers/columns/transferColumn.js";

const routerColumns = express.Router();

routerColumns.post("/", isAuthorized, addColumn);

routerColumns.put("/:id", isAuthorized, isValidId, updateColumn);

routerColumns.delete("/:id", isAuthorized, isValidId, deleteColumn);

routerColumns.patch("/:id/transfer", isAuthorized, isValidId, transferColumn);

export default routerColumns;
