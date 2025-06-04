"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const uploadDir = path_1.default.join(process.cwd(), "public", "temp");
// Ensure the directory exists
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
exports.upload = (0, multer_1.default)({ storage });
// import multer, { diskStorage, Multer } from "multer";
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("uploading");
//     debugger;
//     cb(null, "/public/temp");
//   },
//   filename: function (req, file, cb) {
//     console.log("req", file.originalname);
//     console.log("uploading");
//     debugger;
//     cb(null, file.originalname);
//   },
// });
// export const upload = multer({
//   storage,
// });
