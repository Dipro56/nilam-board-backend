"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//Application route
const player_route_1 = __importDefault(require("./app/modules/player/player.route"));
const manager_route_1 = __importDefault(require("./app/modules/manager/manager.route"));
const transfer_route_1 = __importDefault(require("./app/modules/transfer/transfer.route"));
const auth_route_1 = __importDefault(require("./app/modules/auth/auth.route"));
const body_parser_1 = __importDefault(require("body-parser"));
// const storage = diskStorage({
//   destination: (
//     req: Request,
//     file,
//     cb: (error: Error | null, destination: string) => void
//   ) => {
//     cb(null, "uploads/");
//   },
//   filename: (
//     req: Request,
//     file,
//     cb: (error: Error | null, filename: string) => void
//   ) => {
//     console.log("stprage app ts file: ", file);
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({
//   dest: "uploads/",
//   storage, // Specify the destination folder for uploaded files
// });
app.use((0, cors_1.default)());
// app.use(upload.single('image'),(req:Request, res) => {
//   console.log('req: ', req.body)
//   res.send('file uploaded')
// });
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));
// app.use('/manager', express.static('manager'))
app.use("/api/v1", player_route_1.default);
app.use("/api/v1", manager_route_1.default);
app.use("/api/v1", transfer_route_1.default);
app.use("/api/v1", auth_route_1.default);
//interface  > schema > model > query
exports.default = app;
