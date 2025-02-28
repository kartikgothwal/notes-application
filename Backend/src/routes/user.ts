import express from "express";
import { CreateUserValidation, SignInValidation } from "../validation";
import fetchuser from "../middleware/fetchuser";
import { UpdateUser } from "../controllers/user/updateuser";

const router = express.Router();

router.post(
  "/updatedetails",
  fetchuser as express.RequestHandler,
  CreateUserValidation,
  UpdateUser as express.RequestHandler
);

export default router;
