// import dotenv from 'dotenv';
// import connectDB from './db/index.js';
// import { app } from './app.js';

import dotenv from "dotenv";
import app from "./app";
import connectDB from "./db";

dotenv.config({
  path: "./.env",
});

// app.listen(process.env.PORT || 4000, () => {
//   console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
// });

app.get("/", (req, res) => {
  res.send(` <p>Welcome to Nilam Board</p>`);
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `⚙️ Server is running at port after db connection : ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/
