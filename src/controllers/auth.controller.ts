import { Request, Response } from "express";
import { getAll, save } from "../hooks/asyncHook";
import { User } from "../models/user.model";
import { CUser } from "../services/auth.service";
import generateToken from "../utils/generateToken";
const asyncHandler = require("express-async-handler");

/**
 * authUser a private controller
 * @route POST /api/users
 * @access private
 */
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
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

/**
 * Register a new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { id, email } = req.body as {
    id: string;
    email: string;
  };

  try {
    const payload = req.body;
    await save(User, payload);

    res.status(200).json({
      status: true,
      error: false,
      data: payload,
      message: "Registration successful!",
      token: generateToken(id),
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
