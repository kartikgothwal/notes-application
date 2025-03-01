import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../../models/Users";

export const GetUser = async (req: Request, res: Response): Promise<any> => {
  let success = false;
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ success, message: "User not authenticated" });
    }
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    success = true;
    return res.json({
      success,
      message: "User Data fetched Successfully",
      user,
    });
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(500)
      .json({ success, message: "Internal Server Error", errors: error });
  }
};
