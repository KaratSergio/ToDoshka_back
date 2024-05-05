import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import routerAuth from "./routes/routerAuth.js";
import routerTasks from "./routes/routerTasks.js";
import routerBoards from "./routes/routerBoards.js";
import routerColumns from "./routes/routerColumns.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

export const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", routerAuth);
app.use("/api/tasks", routerTasks);
app.use("/api/boards", routerBoards);
app.use("/api/columns", routerColumns);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

export default app;
