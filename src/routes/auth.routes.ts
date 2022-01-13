import { Router } from "express";
import passport from "passport";
import {
  authLogin,
  authSignup,
  authUserGet,
  updateUserProfile,
} from "../controllers";
import { loginValidation, validate } from "../validation";

const router = Router();
router.route("/signup").post(authSignup);
router.route("/login").post(loginValidation(), validate, authLogin);
router
  .route("/auth-user")
  .get(passport.authenticate("jwt", { session: false }), authUserGet)
  .put(passport.authenticate("jwt", { session: false }), updateUserProfile);

export { router as authRouter };
