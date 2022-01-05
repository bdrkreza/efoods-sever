import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { UploadFile } from "../lib/cloudinary";
import { foodProduct } from "../models";
const fs = require("fs");

const createProduct = AsyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    description,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
  } = req.body;
  try {
    let file: any = req.files?.image;
    // upload base64 image to cloudinary
    const imageURL = await UploadFile.upload(file.tempFilePath, "foods", {
      height: 600,
      width: 600,
    });

    const payload = new foodProduct({
      user: new mongoose.Types.ObjectId(),
      name,
      image: imageURL,
      description,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
    });

    const createProduct = await payload.save();
    fs.unlink(file.tempFilePath, (err: string) => {
      if (err) {
        res.json(err);
      }
    });
    res.status(200).json(createProduct);
  } catch (error: any) {
    res.status(500).json({ message: "Error in creating product", error });
  }
});

export { createProduct };
