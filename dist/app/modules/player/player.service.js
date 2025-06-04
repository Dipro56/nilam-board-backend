"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayerById = exports.updatePlayerById = exports.getPlayerByIdFromDB = exports.getAllPlayers = exports.createPlayerToDB = void 0;
const player_model_1 = __importDefault(require("./player.model"));
const createPlayerToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const player = new player_model_1.default(payload);
    yield player.save();
    return player;
});
exports.createPlayerToDB = createPlayerToDB;
const getAllPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield player_model_1.default.find().sort({ rating: -1, name: 1 });
    return players;
});
exports.getAllPlayers = getAllPlayers;
const getPlayerByIdFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield player_model_1.default.findOne({ _id: payload });
    return player;
});
exports.getPlayerByIdFromDB = getPlayerByIdFromDB;
const updatePlayerById = (payload, updatedInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield player_model_1.default.findByIdAndUpdate({ _id: payload }, updatedInfo, {
        new: true,
    });
    console.log("updated player: ", player);
    return player;
});
exports.updatePlayerById = updatePlayerById;
const deletePlayerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield player_model_1.default.findByIdAndDelete(id);
});
exports.deletePlayerById = deletePlayerById;
