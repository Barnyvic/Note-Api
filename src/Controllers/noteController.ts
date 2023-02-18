import { Response, NextFunction } from "express";

import { ErrorException } from "../Error-handler/error.exceptions";
import { ErrorCode } from "../Error-handler/error.code";
import { successResponse } from "../utils/response";
import User from "../model/userModel";
import Note from "../model/noteModel";
import { INote, IGetUserAuthInfoRequest } from "../utils/interface";

export const createNote = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Title, Description, Body } = req.body;
    if (!Title || !Body || !Description)
      return next(
        new ErrorException(ErrorCode.CONFLIT, "Please Fill empty fields")
      );

    const { _id } = req.user;
    const user = User.findOne({ _id: _id });
    if (!user)
      return next(
        new ErrorException(ErrorCode.Unauthenticated, "Pls Login or Signup")
      );

    const Newnote = await Note.create({
      Title,
      Body,
      user: _id,
      Description,
    });

    return successResponse(res, 201, "Success", Newnote);
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};

export const getAllNotes = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await Note.find().populate("user", "firstName lastName");

    return successResponse(res, 200, "Success", notes);
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};

export const getNote = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);

    if (!note)
      return next(new ErrorException(ErrorCode.NotFound, "Note not found"));

    return successResponse(res, 200, "Notet....", note);
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};

export const updateNote = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user;
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    const updatedNote =
      _id?.toString() === note?.user?.toString()
        ? await Note.findByIdAndUpdate(
            { _id: noteId },
            {
              $set: req.body,
            },
            {
              new: true,
            }
          )
        : next(
            new ErrorException(
              ErrorCode.FOBIDDEN_ERROR,
              "You are not allowed to edit this note"
            )
          );
    return successResponse(res, 200, "Note Updated....", updatedNote);
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};

export const deleteNote = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user;
    const { noteId } = req.params;
    const note = await Note.findById(noteId);


     if (_id?.toString() === note?.user?.toString()) {
       await Note.findByIdAndDelete({ _id: noteId });
       return successResponse(res, 204, "Product Deleted successfully..");
     }
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};
