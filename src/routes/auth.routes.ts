import express from "express";
import {
  authUser,
  getUser,
  registerUser,
} from "../controllers/auth.controller";
import { signUpValidation, validate } from "../validation";
const router = express.Router();

router.route("/login").post(authUser);
router
  .route("/register")
  .post(signUpValidation(), validate, registerUser)
  .get(getUser);
export default router;
