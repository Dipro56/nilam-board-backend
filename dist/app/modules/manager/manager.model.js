"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const managerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    club: { type: String, required: true },
    totalMoney: { type: String, required: true },
    totalSpent: { type: String, required: true },
    image: { type: String, required: true },
});
const Manager = (0, mongoose_1.model)('Manager', managerSchema);
exports.default = Manager;
