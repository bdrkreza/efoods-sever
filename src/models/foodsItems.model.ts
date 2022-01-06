import { model, Schema } from "mongoose";
import { IFoodsDocument } from "../services";

const reviewSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "customer",
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
});

const foodsSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "customer",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const foodItemsModel = model<IFoodsDocument>("foods", foodsSchema);
