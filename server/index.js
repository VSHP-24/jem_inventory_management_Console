import express from "express";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cookieParser from "cookie-parser";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import brandRouter from "./routes/brandRoutes.js";
import bikeRouter from "./routes/bikeRoutes.js";
import partRouter from "./routes/partRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import subCategoryRouter from "./routes/subCategoryRoutes.js";
import purchaseRouter from "./routes/purchaseRoutes.js";
import customerRouter from "./routes/customerRoute.js";

// START EXPRESS APP
const app = express();

/////////////////////////////////////////////////
//              MIDDLEWARES
/////////////////////////////////////////////////

// SET SECURITY HTTP HEADERS
app.use(helmet());

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// LIMIT REQUESTS FROM SAME API
const limiter = rateLimit({
  max: 2500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requrests from this IP, please try again in an hour",
});

app.use("/api", limiter);

// IMPLEMENT CORS
const allowlist = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://jem.vshp.dev/",
  "https://jeminventory.vshp.dev/",
];
const corsOptionsDelegate = function (req, callback) {
  var corsOptions = {
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  };
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions.origin = false; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

// BODY PARSER , READING DATA FROM BODY INTO req.body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// DATA SANITIZATION AGAINST NoSQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS
app.use(xss());

// PREVENT PARAMETER POLLUTION
app.use(hpp());

/////////////////////////////////////////////////
//              ROUTES
/////////////////////////////////////////////////

app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/bikes", bikeRouter);
app.use("/api/v1/parts", partRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/purchases", purchaseRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} is not defined`, 404));
});

app.use(globalErrorHandler);

export default app;
