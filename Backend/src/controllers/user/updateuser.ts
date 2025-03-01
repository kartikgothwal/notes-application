import { Request, Response } from "express";
import User from "../../models/Users";

export const UpdateUser = async (req: Request, res: Response): Promise<any> => {
  let success = false;
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ success, message: "User not authenticated" });
    }
    const payload = req.body;
    const user = await User.findOneAndUpdate({ email: payload.email }, payload);
    success = true;
    return res.json({
      success,
      message: "User Details updated Successfully",
      user,
    });
  } catch (error: unknown) {
    console.error(error);
    return res
      .status(500)
      .json({ success, message: "Internal Server Error", errors: error });
  }
};
