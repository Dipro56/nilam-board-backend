"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const player_controller_1 = require("./player.controller");
const auth_middelware_1 = require("../../middlewares/auth.middelware");
const multer_middleware_1 = require("../../middlewares/multer.middleware");
const router = express_1.default.Router();
router.get("/player/get-all-player", player_controller_1.getAllPlayer);
router.get("/player/:id", player_controller_1.getPlayerById);
router.post("/player/create-player", auth_middelware_1.verifyAdmin, multer_middleware_1.upload.fields([
    {
        name: "image",
    },
]), player_controller_1.createPlayer);
router.put("/player/:id", auth_middelware_1.verifyAdmin, player_controller_1.updatePlayer);
router.delete("/player/:id", auth_middelware_1.verifyAdmin, player_controller_1.deletePlayer);
// router.post('/create-player', upload.single('image'), (req, res) => {
//   console.log(req.file)
//    console.log(req.body)
//   res.send('req successfully sent')
// });
exports.default = router;
