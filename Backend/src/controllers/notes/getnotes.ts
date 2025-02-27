import { Request, Response } from "express";
import Notes from "../models/Notes";

export const GetNotes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    return res.status(200).json({ message: "All Notes Fetched Successfully", notes });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      errors: error,
    });
  }
};