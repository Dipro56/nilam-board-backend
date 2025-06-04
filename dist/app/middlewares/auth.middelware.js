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
exports.verifyAdmin = exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const asyncHandler_1 = require("../utils/asyncHandler");
const user_model_1 = __importDefault(require("../modules/user/user.model"));
exports.verifyJWT = (0, asyncHandler_1.asyncHandler)((req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
            ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
        // console.log(token);
        if (!token) {
            throw new ApiError_1.ApiError(401, "Unauthorized request");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let user;
        if (decodedToken &&
            typeof decodedToken !== "string" &&
            "_id" in decodedToken) {
            user = yield user_model_1.default.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id).select("-password -refreshToken -createdAt -updatedAt -__v");
        }
        if (!user) {
            throw new ApiError_1.ApiError(401, "Invalid Access Token");
        }
        console.log("authverifyuser", user);
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError_1.ApiError(401, "Invalid access token for user");
    }
}));
exports.verifyAdmin = (0, asyncHandler_1.asyncHandler)((req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const token = ((_c = req.cookies) === null || _c === void 0 ? void 0 : _c.accessToken) ||
            ((_d = req.header("Authorization")) === null || _d === void 0 ? void 0 : _d.replace("Bearer ", ""));
        // console.log(token);
        if (!token) {
            throw new ApiError_1.ApiError(401, "Unauthorized request");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let user;
        if (decodedToken &&
            typeof decodedToken !== "string" &&
            "_id" in decodedToken) {
            user = yield user_model_1.default.findById(decodedToken._id).select("-password -refreshToken -createdAt -updatedAt -__v");
        }
        if (!user) {
            throw new ApiError_1.ApiError(401, "Invalid Access Token");
        }
        else if ((user === null || user === void 0 ? void 0 : user.role) !== "admin") {
            throw new ApiError_1.ApiError(403, "User is not an admin");
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError_1.ApiError(401, "Invalid access token for admin");
    }
}));
