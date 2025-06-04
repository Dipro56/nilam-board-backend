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
exports.login = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const ApiError_1 = require("../../utils/ApiError");
const ApiResponse_1 = require("../../utils/ApiResponse");
const user_model_1 = __importDefault(require("../user/user.model"));
const generateAccessAndRefereshTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        const accessToken = user.generateAccessToken();
        yield user.save({ validateBeforeSave: false });
        return { accessToken };
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, "Something went wrong while generating refresh and access token");
    }
});
const login = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json(new ApiResponse_1.ApiResponse(400, {}, "Username  & password both required"));
    }
    const allUser = yield user_model_1.default.find();
    console.log("allUser", allUser);
    const existedUser = yield user_model_1.default.findOne({ username: username });
    console.log("existedUser", existedUser);
    if (existedUser) {
        // const user = await User.findOne({ username: username });
        // console.log('user', user);
        const { accessToken } = yield generateAccessAndRefereshTokens(existedUser._id.toString());
        const loggedInUser = yield user_model_1.default.findById(existedUser._id).select("-createdAt -updatedAt -__v");
        const options = {
            httpOnly: true,
            secure: true,
        };
        return (res
            .status(200)
            .cookie("accessToken", accessToken, options)
            // .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse_1.ApiResponse(200, {
            user: loggedInUser,
            accessToken,
        }, "User logged in Successfully")));
    }
    else {
        return res.status(400).json(new ApiResponse_1.ApiResponse(400, {}, "User not found"));
    }
}));
exports.login = login;
