import { validationResult } from "express-validator";
const Notes = require("../../models/Notes");

export const AddNote = async (req, res) => {
  const { title, description, tag } = req.body;
  const errors = validationResult(req);
  //  If there is any error return error 400 status with the error
  if (!errors.isEmpty()) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: errors,
    });
  }
  // Put everything inside the try block so that if any error occur then,
  // we can handle in the catch block
  try {
    // Get all  the notes data enetred by user using destructuring
    const note = new Notes({ title, description, tag, user: req.user.id });
    // Save the notes into the database
    const savenotes = await note.save();
    // return success status 200 with the note message
    return res.status(200).json({
      message: "Note added successfully",
      note: savenotes,
    });
  } catch (error) {
    // If any error occured then return status 500 with message Internal Server error
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};
