"use strict";
// import dotenv from 'dotenv';
// import connectDB from './db/index.js';
// import { app } from './app.js';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config({
    path: "./.env",
});
// app.listen(process.env.PORT || 4000, () => {
//   console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
// });
app_1.default.get("/", (req, res) => {
    res.send(` <p>Welcome to Nilam Board</p>`);
});
(0, db_1.default)()
    .then(() => {
    app_1.default.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port after db connection : ${process.env.PORT}`);
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
