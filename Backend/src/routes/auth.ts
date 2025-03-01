import express from "express";
import { SignIn } from "../controllers/auth";
import { SignUp } from "../controllers/auth";
import { CreateUserValidation, SignInValidation } from "../validation";
import { Verify } from "../controllers/auth/verify";
import fetchuser from "../middleware/fetchuser";

const router = express.Router();

router.post("/signup", CreateUserValidation, SignUp);
router.post("/signin", SignInValidation, SignIn);
router.post("/verify", fetchuser as express.RequestHandler, Verify);

export default router;
