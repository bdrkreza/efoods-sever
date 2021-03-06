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
      const token = jwt.issueJWT(authUser);
      await authUser.save();

      const user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        token: token,
      };
      resSendData(res, user);
    } catch (error) {
      resSendError(res, error);
      next(error);
    }
  }
);

const authLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthUser.findOne({ email: req.body.email });
    try {
      if (!user) {
        throw new Error("No user with this email!");
      }
      const isValidPassword = await user.isValidPassword(req.body.password);
      if (!isValidPassword) {
        throw new Error("Incorrect email or password!");
      }

      const token = jwt.issueJWT(user);
      res.json(
        createResponse({
          name: user.name,
          email: user.email,
          id: user._id,
          phone: user.phone,
          role: user.role,
          status: user.status,
          token,
        })
      );
    } catch (err) {
      next(err);
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
