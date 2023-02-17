import { Request, Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../utils/interface";
import { decodeToken } from "../utils/generateToken";
import User from "../model/userModel";
import { ErrorCode } from "../Error-handler/error.code";
import { ErrorException } from "../Error-handler/error.exceptions";


export const authguard = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded: any = await decodeToken(token);
      const user = await User.findById(decoded.id);
      if (!user)  return next(new ErrorException(ErrorCode.NotFound, "User not Found"));
      req.user = user;
      return next();
    } else {
      return next(
        new ErrorException(
          ErrorCode.NotFound,
          "No token pls register and login"
        )
      );
    }
  } catch (error: any) {
   next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};
