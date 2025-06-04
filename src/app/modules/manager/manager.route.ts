import express from "express";
import {
  createManager,
  getAllManager,
  getManagerById,
  updateManager,
} from "./manager.controller";
import { verifyAdmin, verifyJWT } from "../../middlewares/auth.middelware";
import { upload } from "../../middlewares/multer.middleware";

const router = express.Router();

router.get("/manager/get-all-manager", getAllManager);
router.get("/manager/:id", getManagerById);
router.post(
  "/manager/create-manager",
  verifyAdmin,
  upload.fields([
    {
      name: "image",
    },
  ]),
  createManager
);
router.put("/manager/:id", updateManager);

export default router;
