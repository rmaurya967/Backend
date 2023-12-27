import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";

dotenv.config({ path: "./env" });

const app = express();

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Error :", err);
      throw err;
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection failed", err);
  });
