import express from "express";
import { SignIn } from "../controllers/auth";
import { SignUp } from "../controllers/auth";
import { CreateUserValidation, SignInValidation } from "../validation";

const router = express.Router();

router.post("/createuser", CreateUserValidation, SignUp);

router.post("/login", SignInValidation, SignIn);

export default router;
