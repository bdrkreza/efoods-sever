import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models";

export const loginValidation = () => {
  return [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is not a valid email")
      .trim()
      .escape(),
    body("password")
      .isLength({ min: 6 })
      .trim()
      .escape()
      .withMessage("Must be at least 6 chars long"),
  ];
};

export const signUpValidation = () => {
  return [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 chars long")
      .trim()
      .escape(),
    body("email")
      .custom((value) => {
        return User.find({
          email: value,
        }).then((user) => {
          if (user.length > 0) {
            return Promise.reject("Email address already taken");
          }
        });
      })
      .trim()
      .escape(),
    body("password")
      .not()
      .isIn(["123", "password", "god"])
      .withMessage("Do not use a common word as the password")
      .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      })
      .withMessage(
        "Password must be greater than 6 and contain at least one uppercase letter, one lowercase letter, and one number and "
      )
      .trim()
      .escape(),
  ];
};

export const FoodItemsValidation = () => {
  return [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 chars long")
      .trim()
      .escape(),
    body("price")
      .isNumeric()
      .trim()
      .escape()
      .withMessage("Price must be a number"),
    body("description")
      .isLength({ min: 6, max: 400 })
      .trim()
      .escape()
      .withMessage("Name must be at least 6 chars long"),
    body("category")
      .isLength({ min: 1 })
      .trim()
      .escape()
      .withMessage("Category is required 1 field"),
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: Object[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    statue: "error",
    data: null,
    message: "The given data was invalid",
    errors: extractedErrors,
  });
};
