import { Document } from "mongoose";

/**
 * Represents a product
 */
export interface IProduct {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

/**
 * Represents a product review
 */
export interface IReview {
  user: string;
  name: string;
  rating: number;
  comment: string;
}

/**
 * Represents a product w/ reviews
 */
interface IProductInDatabase extends IProduct {
  user: string;
  reviews: IReview[];
}

export interface IProductDocument extends IProductInDatabase, Document {}
