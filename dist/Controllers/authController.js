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
exports.login = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const error_exceptions_1 = require("../Error-handler/error.exceptions");
const error_code_1 = require("../Error-handler/error.code");
const hashPassword_1 = require("../utils/hashPassword");
const response_1 = require("../utils/response");
const generateToken_1 = require("../utils/generateToken");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, phone, confirmPassword } = req.body;
        //    making sure all fields are valid
        if (!email ||
            !password ||
            !firstName ||
            !lastName ||
            !phone ||
            !confirmPassword) {
            return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.VALIDATE_ERROR, "Please Fill empty fields"));
        }
        //   confirming password
        if (password !== confirmPassword) {
            return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.AsyncError, "Password must be provided"));
        }
        const emialExist = yield userModel_1.default.findOne({ email });
        if (emialExist)
            return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.CONFLIT, "email already in use by another user"));
        const phoneExist = yield userModel_1.default.findOne({ phone });
        if (phoneExist)
            return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.CONFLIT, "Phone Number already in use by another user"));
        const hash = yield (0, hashPassword_1.hashPassword)(password);
        // save user to db
        const user = yield userModel_1.default.create({
            firstName,
            lastName,
            email,
            phone,
            password: hash,
        });
        return (0, response_1.successResponse)(res, 201, "Account created successfully, kindly verify your email and login.", user);
    }
    catch (error) {
        next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.createUser = createUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.VALIDATE_ERROR, "Please Fill empty fields"));
        const user = yield userModel_1.default.findOne({ email });
        if (!user)
            return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.NotFound, "User not found pls register"));
        const isPassword = yield (0, hashPassword_1.comparePassword)(password, user.password);
        if (!isPassword)
            return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.CONFLIT, "incorrect password"));
        const token = yield (0, generateToken_1.generateToken)({
            id: user._id,
            email: user.email,
        });
        return (0, response_1.successResponse)(res, 200, "user logged in successfully", {
            user,
            token,
        });
    }
    catch (error) {
        next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map