import express from "express";
import { CreateUserValidation, SignInValidation } from "../validation";
import fetchuser from "../middleware/fetchuser";
import { UpdateUser } from "../controllers/user/updateuser";
import { GetUser } from "../controllers/user";

const router = express.Router();

router.put(
  "/updatedetails",
  fetchuser as express.RequestHandler,
  UpdateUser as express.RequestHandler
);
router.get(
  "/:id",
  fetchuser as express.RequestHandler,
  GetUser as express.RequestHandler
);

export default router;
