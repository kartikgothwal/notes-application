import { validationResult } from "express-validator";
const Notes = require("../models/Notes");
export const UpdateNote = async (req, res) => {
  // Get all the notes data enetred by user using destructuring
  const { title, description, tag } = req.body;
  const errors = validationResult(req);
  //  If there is any error return error 400 status with the error
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Internal Server Error",
      error: errors,
    });
  }

  // Put everything inside the try block so that if any error occur then,
  // we can handle in the catch block
  try {
    //   create a new object to store the user's notes data
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }
    // Find the note to be updated using id given in parameter
    let note = await Notes.findById(req.params.id);
    // If not found return not found error
    if (!note) {
      return res.status(404).json({ message: "Not Found" });
    }
    // Check if the note belongs to the logged in user if not return unauthorised error

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorised: Not Allowed" });
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );

    // return success status 200 with the note message
    return res.status(200).json({
      message: "Note Updated Successfully",
      note: note,
    });
  } catch (error) {
    // If any error occured then return status 500 with message Internal Server error

    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};
