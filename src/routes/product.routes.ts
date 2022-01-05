import { Router } from "express";
import { createProduct } from "../controllers/product.controller";
import { productValidation, validate } from "../validation";

const router = Router();

router.route("/").post(productValidation(), validate, createProduct);

export { router as productRouter };
