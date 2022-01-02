import { Request, Response } from "express";
import { getAll, save } from "../hooks/asyncHook";
import { User } from "../models/user.model";
import { CUser } from "../services/auth.service";
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
  const email = req.body.email;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("Email Address is Already Registered!");
    }

    const payload = req.body;
    await save(User, payload);

    res.status(200).json({
      status: true,
      data: payload,
      message: "Registration successful!",
      token: true,
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      data: null,
      message: error.message,
      token: null,
    });
  }
});

const getUser = async (req: Request, res: Response) => {
  const vm = new CUser();
  const students = await getAll<any>(User, vm);
  res.send(students);
};

export { registerUser, getUser, authUser };
