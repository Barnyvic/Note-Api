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
exports.deleteNote = exports.updateNote = exports.getNote = exports.getAllNotes = exports.createNote = void 0;
const error_exceptions_1 = require("../Error-handler/error.exceptions");
const error_code_1 = require("../Error-handler/error.code");
const response_1 = require("../utils/response");
const userModel_1 = __importDefault(require("../model/userModel"));
const noteModel_1 = __importDefault(require("../model/noteModel"));
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Title, Description, Body } = req.body;
        if (!Title || !Body || !Description)
            return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.CONFLIT, "Please Fill empty fields"));
        const { _id } = req.user;
        const user = userModel_1.default.findOne({ _id: _id });
        if (!user)
            return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.Unauthenticated, "Pls Login or Signup"));
        const Newnote = yield noteModel_1.default.create({
            Title,
            Body,
            user: _id,
            Description,
        });
        return (0, response_1.successResponse)(res, 201, "Success", Newnote);
    }
    catch (error) {
        next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.createNote = createNote;
const getAllNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield noteModel_1.default.find().populate("user", "firstName lastName");
        return (0, response_1.successResponse)(res, 200, "Success", notes);
    }
    catch (error) {
        next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.getAllNotes = getAllNotes;
const getNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId } = req.params;
        const note = yield noteModel_1.default.findById(noteId);
        if (!note)
            return next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.NotFound, "Note not found"));
        return (0, response_1.successResponse)(res, 200, "Notet....", note);
    }
    catch (error) {
        next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.getNote = getNote;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { _id } = req.user;
        const { noteId } = req.params;
        const note = yield noteModel_1.default.findById(noteId);
        const updatedNote = (_id === null || _id === void 0 ? void 0 : _id.toString()) === ((_a = note === null || note === void 0 ? void 0 : note.user) === null || _a === void 0 ? void 0 : _a.toString())
            ? yield noteModel_1.default.findByIdAndUpdate({ _id: noteId }, {
                $set: req.body,
            }, {
                new: true,
            })
            : next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.FOBIDDEN_ERROR, "You are not allowed to edit this note"));
        return (0, response_1.successResponse)(res, 200, "Note Updated....", updatedNote);
    }
    catch (error) {
        next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { _id } = req.user;
        const { noteId } = req.params;
        const note = yield noteModel_1.default.findById(noteId);
        if ((_id === null || _id === void 0 ? void 0 : _id.toString()) === ((_b = note === null || note === void 0 ? void 0 : note.user) === null || _b === void 0 ? void 0 : _b.toString())) {
            yield noteModel_1.default.findByIdAndDelete({ _id: noteId });
            return (0, response_1.successResponse)(res, 204, "Product Deleted successfully..");
        }
    }
    catch (error) {
        next(new error_exceptions_1.ErrorException(error_code_1.ErrorCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.deleteNote = deleteNote;
//# sourceMappingURL=noteController.js.map