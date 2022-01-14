import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { UploadFile } from "../lib/cloudinary";
import { foodItemsModel } from "../models";
import { IFoodItems, IFoodsDocument } from "../services";
import {
  removeTmp,
  resSendData,
  resSendError,
  resSendMessage,
  resSendNotFound,
} from "../utils";

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

/**
 * get all data from database
 * @route GET /api/FoodsItem
 * @access Public
 */
const getFoodItem = asyncHandler(async (req: Request, res: Response) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    // Get search keyword from request and search for partial match
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          } as any,
        }
      : {};

    const count = await foodItemsModel.countDocuments({ ...keyword });

    const food = await foodItemsModel
      .find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    const getData = {
      food,
      page,
      pages: Math.ceil(count / pageSize),
    };
    res.status(200).json({
      success: true,
      error: null,
      data: food,
      message: "data request successfully",
    });
  } catch (error) {
    resSendError(res, error);
  }
});

const getFoodItemById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const foodItem = await foodItemsModel.findById({ _id: id });
    if (!foodItem) {
      resSendNotFound(res);
    }

    // find related Items based on food category
    const relatedProducts = await foodItemsModel
      .find({
        category: foodItem?.category,
        _id: { $ne: id },
      })
      .limit(8);

    const data = { foodItem, relatedProducts };
    resSendData(res, data);
  } catch (error: any) {
    resSendError(res, error);
  }
});

/**
 * post create data from database
 * @route GET /api/FoodsItem
 * @access admin
 */
const createFoods = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, type, price, category, rating } =
    req.body as IFoodsDocument;

  try {
    let file: any = req.files?.image;
    let path = file.tempFilePath;
    // upload base64 image to cloudinary
    const imageURL = await UploadFile.upload(path, "foods", {
      height: 683,
      width: 1000,
    });
    const { secure_url, public_id } = imageURL;
    const payload = new foodItemsModel({
      customer: new mongoose.Types.ObjectId(),
      name,
      image: secure_url,
      description,
      type,
      price,
      category,
      rating,
      public_id,
    });

    const createFoods = await payload.save();
    resSendData(res, createFoods);
    removeTmp(path);
  } catch (error: any) {
    resSendError(res, error);
  }
});

/**
 * delete  data from database
 * @route Delete /api/FoodsItem
 * @access admin
 */
const removeFoodItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const foodItem = await foodItemsModel.findOne({ _id: id });

    if (!foodItem) {
      resSendNotFound(res);
    }
    await foodItem?.remove();
    await cloudinary.uploader.destroy(foodItem?.public_id);
    let message = "The food was deleted successfully";
    resSendMessage(res, foodItem, message);
  } catch (error: any) {
    resSendError(res, error);
  }
});

/**
 * update data from database
 * @route patch /api/FoodsItem
 * @access admin
 */
const updateFoodItem = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, type, price, category, rating } =
    req.body as IFoodItems;
  try {
    const { id } = req.params as { id: string };
    let FoodItem = await foodItemsModel.findById(id);
    if (!FoodItem) {
      resSendNotFound(res);
    }

    let file: any = req.files?.image;
    console.log(file);
    let path = file.tempFilePath;
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(FoodItem?.public_id);
    // upload  image to cloudinary
    const imageURL = await UploadFile.upload(path, "foods", {
      height: 600,
      width: 600,
    });
    const { secure_url, public_id } = imageURL;
    FoodItem = await foodItemsModel.findOneAndUpdate(
      { id },
      {
        customer: new mongoose.Types.ObjectId(),
        name,
        image: secure_url,
        description,
        type,
        category,
        price,
        rating,
        public_id,
      },
      {
        new: true,
      }
    );

    resSendData(res, FoodItem);
    removeTmp(path);
  } catch (error: any) {
    resSendError(res, error);
  }
});

/**
 * get top data from database
 * @route GET /api/FoodsItem
 * @access Public
 */
const getTopFoodItem = asyncHandler(async (req: Request, res: Response) => {
  const products = await foodItemsModel.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  createFoods,
  getFoodItem,
  getFoodItemById,
  removeFoodItem,
  updateFoodItem,
  getTopFoodItem,
};
