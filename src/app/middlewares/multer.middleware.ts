import path from "path";
import multer from "multer";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public", "temp");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

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
