"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
//secured routes
router.route("/auth/login").post(auth_controller_1.login);
exports.default = router;
