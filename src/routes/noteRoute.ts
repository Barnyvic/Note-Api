import { Router } from "express";
import { createNote, getAllNotes, getNote, updateNote, deleteNote } from "../Controllers/noteController";
import { authguard } from "../middleware/authentication";
const NoteRouter = Router();


NoteRouter.route("/create-note").post(authguard, createNote);
NoteRouter.route("/get-notes").get(authguard, getAllNotes);
NoteRouter.route("/get-note/:noteId").get(authguard, getNote);
NoteRouter.route("/update-note/:noteId").put(authguard, updateNote);
NoteRouter.route("/delete/:noteId").delete(authguard, deleteNote);

export default NoteRouter;