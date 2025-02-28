import { body } from "express-validator";

const AddNotesValidation = [
  body("title")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),
  body("content")
    .isLength({ min: 3 })
    .withMessage("content must be at least 3 characters"),
  body("category")
    .isLength({ min: 3 })
    .withMessage("category must be at least 3 characters"),
];
const CreateUserValidation = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),
  body("cpassword")
    .isLength({ min: 5 })
    .withMessage("Confirm password must be at least 5 characters"),
];
const SignInValidation = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").exists().withMessage("Password cannot be blank"),
];
export { AddNotesValidation, CreateUserValidation, SignInValidation };
