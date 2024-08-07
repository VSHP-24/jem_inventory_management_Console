import express from "express";
import morgan from "morgan";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import brandRouter from "./routes/brandRoutes.js";
import bikeRouter from "./routes/bikeRoutes.js";
import partRouter from "./routes/partRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import subCategoryRouter from "./routes/subCategoryRoutes.js";

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
app.use("/api/v1/products", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subcategory", subCategoryRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} is not defined`, 404));
});

app.use(globalErrorHandler);

export default app;
