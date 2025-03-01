import { Request, Response } from "express";

export const Verify = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(200).json({ message: "Authenticated" });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Please Authenticate using correct Credentials",
    });
  }
};
