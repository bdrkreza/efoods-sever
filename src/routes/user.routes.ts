import { Router } from "express";
import { updateUserProfile } from "./../controllers/user.controller";

const router = Router();

router.route("/:id").patch(updateUserProfile);

export { router as userRouter };
