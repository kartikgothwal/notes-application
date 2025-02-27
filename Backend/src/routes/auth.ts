import express from "express";
import { SignIn } from "../controllers/auth";
import { SignUp } from "../controllers/auth";
import { body } from "express-validator";

const router = express.Router();

// ROUTE 1: Create a User using: POST -> "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),
    body("cpassword").isLength({ min: 5 }).withMessage("Confirm password must be at least 5 characters")
  ],
  SignUp
);

// ROUTE 2: Authenticate a User using: POST -> "/api/auth/login"
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").exists().withMessage("Password cannot be blank")
  ],
  SignIn
);

export default router;