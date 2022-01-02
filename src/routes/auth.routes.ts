import express from "express";
import {
  authUser,
  getUser,
  registerUser,
} from "../controllers/auth.controller";
const router = express.Router();

router.route("/login").post(authUser);
router.route("/register").post(registerUser).get(getUser);
export default router;
