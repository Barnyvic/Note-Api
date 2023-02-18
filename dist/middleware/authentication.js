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
exports.authguard = void 0;
const generateToken_1 = require("../utils/generateToken");
const userModel_1 = __importDefault(require("../model/userModel"));
const error_code_1 = require("../Error-handler/error.code");
const error_exceptions_1 = require("../Error-handler/error.exceptions");
const authguard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = yield (0, generateToken_1.decodeToken)(token);
            const user = yield userModel_1.default.findById(decoded.id);
            if (!user)
                return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.NotFound, "User not Found"));
            req.user = user;
            return next();
        }
        else {
            return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.NotFound, "No token pls register and login"));
        }
    }
    catch (error) {
        next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.authguard = authguard;
//# sourceMappingURL=authentication.js.map