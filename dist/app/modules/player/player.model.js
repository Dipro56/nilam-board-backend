"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const playerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    position: { type: String, required: true },
    rating: { type: String, required: true },
    price: { type: String, required: true },
    club: { type: String, required: true },
    clubOwner: { type: String, required: true },
    image: { type: String, required: true },
});
const Player = (0, mongoose_1.model)('Player', playerSchema);
exports.default = Player;
