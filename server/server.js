import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("Uncaught Expression ❌ Shutting down....");
  console.log(err.name, err.message);
  process.exit(1);
});

import mongoose from "mongoose";
import app from "./index.js";

/////////////////////////////////////////////////
//        CONNECTING DB WITH EXPRESS
/////////////////////////////////////////////////

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("DB connection successful"));

/////////////////////////////////////////////////
//              SERVER
/////////////////////////////////////////////////

const port =
  process.env.PORT || process.env.X_ZOHO_CATALYST_LISTEN_PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandler Rejection ❌ Shutting down....");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
