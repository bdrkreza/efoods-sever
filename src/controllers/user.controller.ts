import { Request, Response } from "express";
import { User } from "../models";

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    let user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.id !== id) {
      return res.status(402).json({ message: "Ops user id mismatch" });
    }

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
