import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Notes from "../models/Notes";

export const UpdateNote = async (req: Request, res: Response): Promise<Response> => {
  const { title, description, tag } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Internal Server Error",
      error: errors,
    });
  }

  try {
    const newnote: { title?: string; description?: string; tag?: string } = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorised: Not Allowed" });
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });

    return res.status(200).json({
      message: "Note Updated Successfully",
      note: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};