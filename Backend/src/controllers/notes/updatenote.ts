import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Notes from "../../models/Notes";

export const UpdateNote = async (req: Request, res: Response): Promise<any> => {
  const { title, content, category } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Internal Server Error",
      error: errors,
    });
  }

  try {
    const newnote: { title?: string; content?: string; category?: string } = {};
    if (title) {
      newnote.title = title;
    }
    if (content) {
      newnote.content = content;
    }
    if (category) {
      newnote.category = category;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (!req.user || note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorised: Not Allowed" });
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );

    return res.status(200).json({
      message: "Note Updated Successfully",
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
