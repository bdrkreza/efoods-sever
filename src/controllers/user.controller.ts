import { Request, Response } from "express";
import { AuthUser } from "../models";

const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    let user = await AuthUser.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.id !== id) {
      return res.status(402).json({ message: "Ops user id mismatch" });
    }
    await cloudinary.uploader.destroy(user.image);
    if (user) {
      // upload base64 image to cloudinary
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();

      res.json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Error in updating user details" });
  }
};

export { updateUserProfile };
