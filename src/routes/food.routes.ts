import { Router } from "express";
import { createFoods } from "../controllers";
import { FoodItemsValidation, validate } from "../validation";

const router = Router();

router.route("/").post(FoodItemsValidation(), validate, createFoods);

export { router as foodRouter };
