import { Document } from "mongoose";

/**
 * Represents a product
 */
export interface IFoodItems {
  name: string;
  image: string;
  description: string;
  type: string;
  category: string;
  price: number;
  rating: number;
  public_id: string;
}

/**
 * Represents a product review
 */
export interface IReview {
  customer: string;
  name: string;
  rating: number;
  comment: string;
}

/**
 * Represents a product w/ reviews
 */
interface IFoodsItemInDatabase extends IFoodItems {
  customer: string;
  reviews: IReview[];
}

export interface IFoodsDocument extends IFoodsItemInDatabase, Document {}
