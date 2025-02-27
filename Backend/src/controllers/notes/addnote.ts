import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Notes from "../../models/Notes";

export const AddNote = async (req: Request, res: Response): Promise<Response> => {
  const { title, description, tag } = req.body;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: errors,
    });
  }

  try {
    const note = new Notes({ title, description, tag, user: req.user.id });
    const savenotes = await note.save();
    
    return res.status(200).json({
      message: "Note added successfully",
      note: savenotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};