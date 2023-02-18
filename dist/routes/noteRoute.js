"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noteController_1 = require("../Controllers/noteController");
const authentication_1 = require("../middleware/authentication");
const NoteRouter = (0, express_1.Router)();
NoteRouter.route("/create-note").post(authentication_1.authguard, noteController_1.createNote);
NoteRouter.route("/get-notes").get(authentication_1.authguard, noteController_1.getAllNotes);
NoteRouter.route("/get-note/:noteId").get(authentication_1.authguard, noteController_1.getNote);
NoteRouter.route("/update-note/:noteId").put(authentication_1.authguard, noteController_1.updateNote);
NoteRouter.route("/delete/:noteId").delete(authentication_1.authguard, noteController_1.deleteNote);
exports.default = NoteRouter;
//# sourceMappingURL=noteRoute.js.map