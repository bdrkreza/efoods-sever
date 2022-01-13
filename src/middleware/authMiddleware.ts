import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers as { authorization: string };
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, role } = decoded;
    req = email;
    req = role;
    console.log(req);
    next();
  } catch (err) {
    res.status(403).json({
      message: "You are not authorize to perform this action",
      error: err,
    });
    next(err);
  }
};

export const authorize = (roles: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const User: any = req.user;

    if (!roles.includes(User.role)) {
      return res.status(403).json({
        message: "You are not authorize to perform this action",
      });
    }
    next();
  };
};
