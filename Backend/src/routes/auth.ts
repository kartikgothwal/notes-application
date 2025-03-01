import express from "express";
import { SignIn } from "../controllers/auth";
import { SignUp } from "../controllers/auth";
import { CreateUserValidation, SignInValidation } from "../validation";
import { Verify } from "../controllers/auth/verify";

const router = express.Router();

router.post("/createuser", CreateUserValidation, SignUp);

router.post("/login", SignInValidation, SignIn);
router.get("/verify", SignInValidation, Verify);

export default router;
