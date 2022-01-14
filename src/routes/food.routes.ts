import { Router } from "express";
import passport from "passport";
import {
  createFoods,
  getFoodItem,
  getFoodItemById,
  getTopFoodItem,
  removeFoodItem,
  updateFoodItem,
} from "../controllers";
import { FoodItemsValidation, validate } from "../validation";

const router = Router();

router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    FoodItemsValidation(),
    validate,
    createFoods
  );
router.route("/").get(getFoodItem);
router.get("/top", getTopFoodItem);
router
  .route("/:id")
  .get(passport.authenticate("jwt", { session: false }), getFoodItemById)
  .delete(passport.authenticate("jwt", { session: false }), removeFoodItem)
  .put(passport.authenticate("jwt", { session: false }), updateFoodItem);

export { router as foodRouter };
