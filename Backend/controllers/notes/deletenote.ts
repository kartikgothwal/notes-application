import { validationResult } from "express-validator";

export const DeleteNote = async (req, res) => {
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
    // Find the note to be deleted using id given in parameter
    let note = await Notes.findById(req.params.id);
    // If not found return not found error
    if (!note) {
      return res.status(404).json({ message: "Not Found" });
    }
    // Check if the note belongs to the logged in user if not return unauthorised error
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorised: Not Allowed" });
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    // return success status 200 with the note message

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      note: note,
    });
  } catch (error) {
    // If any error occured then return status 500 with message Internal Server error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
