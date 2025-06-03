import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middelware";
import { getCurrentUser } from "./user.controller";

const router = Router();
router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;
