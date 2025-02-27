import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../models/Users";

export const GetUser = async (req: Request, res: Response): Promise<Response> => {
  let success = false;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    success = true;
    return res.json({
      success,
      message: "User Data fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error", errors: error });
  }
};