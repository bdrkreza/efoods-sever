import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { UploadFile } from "../lib/cloudinary";
import { foodItemsModel } from "../models";
import { IFoodsDocument } from "../services";
const fs = require("fs");

const createFoods = AsyncHandler(async (req: Request, res: Response) => {
  const { name, description, type, price, category, image, rating } =
    req.body as IFoodsDocument;
  try {
    let file: any = req.files?.image;
    // upload base64 image to cloudinary
    const imageURL = await UploadFile.upload(file.tempFilePath, "foods", {
      height: 600,
      width: 600,
    });

    const payload = new foodItemsModel({
      customer: new mongoose.Types.ObjectId(),
      name,
      image: imageURL,
      description,
      type,
      price,
      category,
      rating,
    });

    const createFoods = await payload.save();
    res.status(200).json({
      status: "success",
      error: false,
      data: createFoods,
      message: "food items create successful!",
    });
    fs.unlink(file.tempFilePath, (err: string) => {
      if (err) {
        res.json(err);
      }
    });
  } catch (error: any) {
    res.status(500).json({ status: "error", error: error, data: null });
  }
});

export { createFoods };
