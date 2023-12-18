import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({path: "./env"})

connectDB()
.then(() => {
  app.on("Error", (err) => {
    console.log("Error :", err);
    throw err;
  })
  app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running");
  })
  })
.catch((err) => {
  console.log("Mongo DB connection failed", err);
});