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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlayerAndManager = void 0;
const player_service_1 = require("../player/player.service");
const manager_service_1 = require("../manager/manager.service");
const updatePlayerAndManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { updatedPlayerInfo, updatedManagerInfo } = req.body;
    console.log('req.body: ', req.body);
    console.log('updatedPlayerInfo: ', updatedPlayerInfo);
    console.log('updatedManagerInfo: ', updatedManagerInfo);
    const player = yield (0, player_service_1.updatePlayerById)(updatedPlayerInfo === null || updatedPlayerInfo === void 0 ? void 0 : updatedPlayerInfo.playerId, updatedPlayerInfo);
    const manager = yield (0, manager_service_1.updateManagerById)(updatedManagerInfo === null || updatedManagerInfo === void 0 ? void 0 : updatedManagerInfo.managerId, updatedManagerInfo);
    console.log('player: ', player);
    console.log('manager: ', manager);
    if (player && manager) {
        res.status(200).json({
            status: 'success',
            playerUpdateMessage: `${player === null || player === void 0 ? void 0 : player.name} sold to ${player === null || player === void 0 ? void 0 : player.club} for ${player === null || player === void 0 ? void 0 : player.price}M`,
            managerInfo: manager,
        });
    }
    else {
        res.status(404).json({ message: `Transfer failed` });
    }
});
exports.updatePlayerAndManager = updatePlayerAndManager;
