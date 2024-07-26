import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./index.js";

dotenv.config({ path: "./config.env" });

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
