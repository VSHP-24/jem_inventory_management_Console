import express from "express";
import morgan from "morgan";

import brandRouter from "./routes/brandRoutes.js";
import bikeRouter from "./routes/bikeRoutes.js";
import partRouter from "./routes/partRoutes.js";

const app = express();

/////////////////////////////////////////////////
//              MIDDLEWARES
/////////////////////////////////////////////////
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

/////////////////////////////////////////////////
//              ROUTES
/////////////////////////////////////////////////

app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/bikes", bikeRouter);
app.use("/api/v1/parts", partRouter);

export default app;
