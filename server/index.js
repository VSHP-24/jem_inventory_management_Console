import express from "express";
import morgan from "morgan";

import brandRouter from "./routes/brandRoutes.js";
import bikeRouter from "./routes/bikeRoutes.js";

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

export default app;
