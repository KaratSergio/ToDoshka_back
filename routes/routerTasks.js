import express from "express";

import isValidId from "../middlewares/isValidId.js";
import isAuthorized from "../middlewares/isAuthorized.js";

import addTask from "../controllers/task/addTask.js";
import updateTask from "../controllers/task/updateTask.js";
import deleteTask from "../controllers/task/deleteTask.js";
import transferTask from "../controllers/task/transferTask.js";

const routerTasks = express.Router();

routerTasks.post("/", isAuthorized, addTask);

routerTasks.put("/:id", isAuthorized, isValidId, updateTask);

routerTasks.delete("/:id", isAuthorized, isValidId, deleteTask);

routerTasks.patch("/:id/transfer", isAuthorized, isValidId, transferTask);

export default routerTasks;
