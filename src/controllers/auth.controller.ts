import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/user.model";
import { CUser, getAll } from "../services/auth.service";
import generateToken from "../utils/generateToken";
const asyncHandler = require("express-async-handler");

const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await User.findOne({ email });

  if (user && (await user.matchesPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body as {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  };

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      role: user.role,
      id: new mongoose.Types.ObjectId(),
      createdAt: new Date(),
      modifiedAt: new Date(),
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUser = async (req: Request, res: Response) => {
  const vm = new CUser();
  const students = await getAll<any>(User, vm);
  res.send(students);
};

export { registerUser, getUser, authUser };
