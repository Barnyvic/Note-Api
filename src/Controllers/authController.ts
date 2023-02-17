import { Request, Response, NextFunction } from "express";
import User from "../model/userModel"
import { ErrorException } from "../Error-handler/error.exceptions";
import { ErrorCode } from "../Error-handler/error.code";
import { comparePassword, hashPassword } from "../utils/hashPassword";
import { successResponse } from "../utils/response";
import { generateToken } from "../utils/generateToken";




export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password, phone, confirmPassword } =
      req.body;

    //    making sure all fields are valid
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phone ||
      !confirmPassword
    ) {
      return next(
        new ErrorException(ErrorCode.VALIDATE_ERROR, "Please Fill empty fields")
      );
    }
    //   confirming password
    if (password !== confirmPassword) {
     return next(
       new ErrorException(ErrorCode.AsyncError, "Password must be provided")
     );
    }

    const emialExist = await User.findOne({ email });
    if (emialExist)
       return next(
        new ErrorException(
          ErrorCode.CONFLIT,
          "email already in use by another user"
        ))

    const phoneExist = await User.findOne({ phone });

    if (phoneExist)
       return next(
         new ErrorException(
           ErrorCode.CONFLIT,
           "Phone Number already in use by another user"
         )
       );

    const hash = await hashPassword(password);

    // save user to db
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hash,
    });


    return successResponse(
      res,
      201,
      "Account created successfully, kindly verify your email and login.",
      user
    );
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};


export const login = async (req: Request, res: Response , next:NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(
        new ErrorException(ErrorCode.VALIDATE_ERROR, "Please Fill empty fields")
      );
    const user = await User.findOne({ email });
    if (!user) return next(
        new ErrorException(ErrorCode.NotFound, "User not found pls register")
      );
    const isPassword = await comparePassword(password, user.password);
    if (!isPassword) return next(new ErrorException(ErrorCode.CONFLIT, "incorrect password"));
    const token = await generateToken({
      id: user.id,
      email: user.email,
    });
    return successResponse(res, 200, "user logged in successfully", {
      user,
      token,
    });
  } catch (error) {
    next(new ErrorException(ErrorCode.INTERNAL_SERVER_ERROR, error.message));
  }
};