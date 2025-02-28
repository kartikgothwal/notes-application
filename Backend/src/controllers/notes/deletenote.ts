import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Notes from "../../models/Notes";

export const DeleteNote = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Internal Server Error",
      error: errors,
    });
  }

  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (!req.user || note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorised: Not Allowed" });
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      note: note,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
