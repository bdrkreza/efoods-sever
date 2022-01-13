import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Mongoose from "mongoose";
import { AuthUser } from "../models/auth.model";
import { createResponse, resSendData, resSendError } from "../utils";

const jwt = require("../lib/jwt");

/**
 * authUser a private controller
 * @route POST /api/users
 * @access private
 */

const authSignup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userExists = await AuthUser.findOne({ email: req.body.email });

      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }

      const body = {
        id: new Mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      };
      const authUser = new AuthUser(body);
      await authUser.save();
      resSendData(res, authUser);
    } catch (error) {
      resSendError(res, error);
      next(error);
    }
  }
);

const authLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authUser = await AuthUser.findOne({ email: req.body.email });
    if (!authUser) {
      throw new Error("No user with this email!");
    }

    const token = jwt.issueJWT(authUser);

    if (authUser && (await authUser.isValidPassword(req.body.password))) {
      res.json({
        data: authUser,
        token: token,
      });
    } else {
      res.status(401);
      throw new Error("Incorrect email or password!");
    }

    try {
    } catch (error) {
      resSendError(res, error);
      next(error);
    }
  }
);

const authUserGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(createResponse(req.user));
  } catch (err) {
    next(err);
  }
};

export { authUserGet, authSignup, authLogin };
