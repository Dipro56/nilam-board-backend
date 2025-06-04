"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manager_controller_1 = require("./manager.controller");
const auth_middelware_1 = require("../../middlewares/auth.middelware");
const multer_middleware_1 = require("../../middlewares/multer.middleware");
const router = express_1.default.Router();
router.get("/manager/get-all-manager", manager_controller_1.getAllManager);
router.get("/manager/:id", manager_controller_1.getManagerById);
router.post("/manager/create-manager", auth_middelware_1.verifyAdmin, multer_middleware_1.upload.fields([
    {
        name: "image",
    },
]), manager_controller_1.createManager);
router.put("/manager/:id", manager_controller_1.updateManager);
exports.default = router;
