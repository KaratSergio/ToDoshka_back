import express from "express";

import isValidId from "../middlewares/isValidId.js";
import isAuthorized from "../middlewares/isAuthorized.js";
import validateBody from "../decorators/validateBody.js";

import addColumn from "../controllers/columns/addColumn.js";
import updateColumn from "../controllers/columns/updateColumn.js";
import deleteColumn from "../controllers/columns/deleteColumn.js";
import transferColumn from "../controllers/columns/transferColumn.js";

import columnSchemas from "../schemas/schemaColumn.js";
import transferSchema from "../schemas/schemaTransfer.js";

const routerColumns = express.Router();
// prettier-ignore
routerColumns.post("/", isAuthorized, validateBody(columnSchemas.addColumnSchema), addColumn );
// prettier-ignore
routerColumns.put("/:id", isAuthorized, isValidId, validateBody(columnSchemas.editColumnSchema), updateColumn );
// prettier-ignore
routerColumns.patch("/:id/transfer", isAuthorized, isValidId, validateBody(transferSchema), transferColumn );

routerColumns.delete("/:id", isAuthorized, isValidId, deleteColumn);

export default routerColumns;
