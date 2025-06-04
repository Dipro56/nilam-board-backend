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
exports.updateManager = exports.getManagerById = exports.getAllManager = exports.createManager = void 0;
const manager_service_1 = require("./manager.service");
const cloudinary_1 = require("../../utils/cloudinary");
const ApiError_1 = require("../../utils/ApiError");
const createManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    let { name, club, totalMoney, totalSpent, transferHistory } = req.body;
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
    const manager = yield (0, manager_service_1.createManagerToDB)({
        name,
        club,
        totalMoney,
        totalSpent,
        image: image === null || image === void 0 ? void 0 : image.url,
    });
    res.status(200).json({
        status: "success",
        message: "Manager created successfully",
        data: manager,
    });
});
exports.createManager = createManager;
const getAllManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = yield (0, manager_service_1.getAllManagers)();
    res.status(200).json({
        status: "success",
        data: manager,
    });
});
exports.getAllManager = getAllManager;
const getManagerById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("id: ", id);
    const manager = yield (0, manager_service_1.getManagerByIdFromDB)(id);
    if (manager) {
        res.status(200).json({
            status: "success",
            message: `Data found for id: ${id}`,
            data: manager,
        });
    }
    else {
        res.status(404).json({ message: `Data not found for id: ${id}` });
    }
});
exports.getManagerById = getManagerById;
const updateManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedInfo = req.body;
    const manager = yield (0, manager_service_1.updateManagerById)(id, updatedInfo);
    if (manager) {
        res.status(200).json({
            status: "success",
            message: `Data updated for manager with id: ${id}`,
            data: manager,
        });
    }
    else {
        res
            .status(404)
            .json({ message: `Data failed to update for manager with id: ${id}` });
    }
});
exports.updateManager = updateManager;
