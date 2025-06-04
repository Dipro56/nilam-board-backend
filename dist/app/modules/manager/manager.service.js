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
exports.getManagerByIdFromDB = exports.updateManagerById = exports.getAllManagers = exports.createManagerToDB = void 0;
const manager_model_1 = __importDefault(require("./manager.model"));
const createManagerToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = new manager_model_1.default(payload);
    yield manager.save();
    return manager;
});
exports.createManagerToDB = createManagerToDB;
const getAllManagers = () => __awaiter(void 0, void 0, void 0, function* () {
    const managers = yield manager_model_1.default.find();
    return managers;
});
exports.getAllManagers = getAllManagers;
const updateManagerById = (payload, updatedInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = yield manager_model_1.default.findByIdAndUpdate({ _id: payload }, updatedInfo, { new: true });
    return manager;
});
exports.updateManagerById = updateManagerById;
const getManagerByIdFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = yield manager_model_1.default.findOne({ _id: payload });
    return manager;
});
exports.getManagerByIdFromDB = getManagerByIdFromDB;
