import express from "express";
import { SignIn } from "../controllers/auth/signin";
import { SignUp } from "../controllers/auth/signup";

const router = express.Router();

// ROUTE 1: Create a User using: POST -> "/api/auth/createuser". Note: 'No Login Required'.
router.post("/createuser", SignUp);

// ROUTE 2: Authenticate a User using: POST -> "/api/auth/login". Note: 'No Login Required'.
router.post("/login", SignIn);

// EXPORT
export default router;