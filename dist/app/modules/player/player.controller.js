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
exports.deletePlayer = exports.updatePlayer = exports.getPlayerById = exports.getAllPlayer = exports.createPlayer = void 0;
const player_service_1 = require("./player.service");
const cloudinary_1 = require("../../utils/cloudinary");
const ApiError_1 = require("../../utils/ApiError");
const createPlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    // console.log('createPlayer controller: ', req);
    // console.log('req.file: ' , req.file)
    let { name, type, position, rating, price, club, clubOwner } = req.body;
    let data;
    let image;
    console.log("req?.files?.image", (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image);
    if ((req === null || req === void 0 ? void 0 : req.files) && ((_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.image)) {
        const avatarLocalPath = (_e = (_d = (_c = req === null || req === void 0 ? void 0 : req.files) === null || _c === void 0 ? void 0 : _c.image) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.path;
        console.log("avatarLocalPath", avatarLocalPath);
        if (avatarLocalPath) {
            image = yield (0, cloudinary_1.uploadOnCloudinary)(avatarLocalPath);
            console.log("image", image);
            if (!image) {
                throw new ApiError_1.ApiError(400, "Avatar file is required");
            }
        }
    }
    const player = yield (0, player_service_1.createPlayerToDB)({
        name,
        type,
        position,
        rating,
        price,
        club,
        clubOwner,
        image: image === null || image === void 0 ? void 0 : image.url,
    });
    res.status(200).json({
        status: "success",
        message: `${player === null || player === void 0 ? void 0 : player.name} added successfully`,
        data: player,
    });
    //inserting data
    //interface  > schema > model > query
    //res.send('Hello World!');
});
exports.createPlayer = createPlayer;
const getAllPlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield (0, player_service_1.getAllPlayers)();
    res.status(200).json({
        status: "success",
        data: player,
    });
});
exports.getAllPlayer = getAllPlayer;
const getPlayerById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("id: ", id);
    const player = yield (0, player_service_1.getPlayerByIdFromDB)(id);
    if (player) {
        res.status(200).json({
            status: "success",
            message: `Data found for id: ${id}`,
            data: player,
        });
    }
    else {
        res.status(404).json({ message: `Data not found for id: ${id}` });
    }
    //inserting data
    //interface  > schema > model > query
    //res.send('Hello World!');
});
exports.getPlayerById = getPlayerById;
const updatePlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedInfo = req.body;
    const player = yield (0, player_service_1.updatePlayerById)(id, updatedInfo);
    if (player) {
        res.status(200).json({
            status: "success",
            message: `Data updated for id: ${id}`,
            data: player,
        });
    }
    else {
        res.status(404).json({ message: `Data failed to update  for id: ${id}` });
    }
});
exports.updatePlayer = updatePlayer;
const deletePlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedPlayer = yield (0, player_service_1.deletePlayerById)(id);
        if (deletedPlayer) {
            res.status(200).json({
                status: "success",
                message: `Player with id: ${id} deleted successfully.`,
                data: deletedPlayer,
            });
        }
        else {
            res.status(404).json({
                status: "fail",
                message: `No player found with id: ${id}`,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deletePlayer = deletePlayer;
