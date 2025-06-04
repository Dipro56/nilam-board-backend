"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middelware_1 = require("../../middlewares/auth.middelware");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.route("/current-user").get(auth_middelware_1.verifyJWT, user_controller_1.getCurrentUser);
exports.default = router;
