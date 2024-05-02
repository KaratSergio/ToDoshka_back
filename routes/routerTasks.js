import express from "express";

import isValidId from "../middlewares/isValidId.js";
import isAuthorized from "../middlewares/isAuthorized.js";

import validateBody from "../decorators/validateBody.js";

import addTask from "../controllers/task/addTask.js";
import updateTask from "../controllers/task/updateTask.js";
import deleteTask from "../controllers/task/deleteTask.js";
import transferTask from "../controllers/task/transferTask.js";

import taskSchemas from "../schemas/schemaTask.js";


const routerTasks = express.Router();

routerTasks.post("/", isAuthorized, validateBody(taskSchemas.addTaskSchema), addTask);

routerTasks.put("/:id", isAuthorized, isValidId, validateBody(taskSchemas.editTaskSchema), updateTask);

routerTasks.delete("/:id", isAuthorized, isValidId, deleteTask);

routerTasks.patch("/:id/transfer", isAuthorized, isValidId, transferTask);

export default routerTasks;
