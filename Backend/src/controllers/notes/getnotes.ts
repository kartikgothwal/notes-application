import { Request, Response } from "express";
import Notes from "../../models/Notes";
Notes;

export const GetNotes = async (req: Request, res: Response): Promise<any> => {
  try {
    const params = req.query;
    if (!!params?.search) {
      const notes = await Notes.find({
        $or: [{ title: { $regex: params.search as string, $options: "i" } }],
      });
      return res
        .status(200)
        .json({ message: "Notes Fetched Successfully", notes, success: true });
    }
    const notes = await Notes.find({ user: req.user?.id });
    return res
      .status(200)
      .json({
        message: "All Notes Fetched Successfully",
        notes,
        success: true,
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
