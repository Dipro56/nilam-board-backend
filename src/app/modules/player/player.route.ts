import express from "express";
import {
  createPlayer,
  deletePlayer,
  getAllPlayer,
  getPlayerById,
  updatePlayer,
} from "./player.controller";
import { verifyAdmin } from "../../middlewares/auth.middelware";
import { upload } from "../../middlewares/multer.middleware";

const router = express.Router();
router.get("/player/get-all-player", getAllPlayer);
router.get("/player/:id", getPlayerById);
router.post(
  "/player/create-player",
  verifyAdmin,
  upload.fields([
    {
      name: "image",
    },
  ]),
  createPlayer
);
router.put("/player/:id", verifyAdmin, updatePlayer);
router.delete("/player/:id", verifyAdmin, deletePlayer);

// router.post('/create-player', upload.single('image'), (req, res) => {
//   console.log(req.file)
//    console.log(req.body)
//   res.send('req successfully sent')
// });
export default router;
