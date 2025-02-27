import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Notes from "../../models/Notes";

export const AddNote = async (req: Request, res: Response): Promise<Response> => {
  const { title, description, tag } = req.body;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: errors.array()
    });
  }

  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id
    });
    
    const savedNote = await note.save();
    
    return res.status(201).json({
      success: true,
      message: "Note added successfully",
      note: savedNote
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};