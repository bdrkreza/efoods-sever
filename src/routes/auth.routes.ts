import express from "express";
import {
  authUser,
  getUser,
  registerUser,
} from "../controllers/auth.controller";
import { signUpValidation, validate } from "../validation";
import { loginValidation } from "./../validation/index";
const router = express.Router();

router.route("/login").post(loginValidation(), validate, authUser);
router
  .route("/register")
  .post(signUpValidation(), validate, registerUser)
  .get(getUser);

export { router as authRouter };
