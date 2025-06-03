import { Router } from "express";
import { login } from "./auth.controller";

const router = Router();

//secured routes
router.route("/auth/login").post(login);

export default router;
