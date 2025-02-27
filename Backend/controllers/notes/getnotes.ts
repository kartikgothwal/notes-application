const Notes = require("../models/Notes");

export const GetNotes = async (req, res) => {
  // Put everything inside the try block so that if any error occur then,
  // we can handle in the catch block
  try {
    // get all the notes using the user id
    const notes = await Notes.find({ user: req.user.id });
    // return success status 200 with notes message
    return res
      .status(200)
      .json({ message: "All Notes Fetched Successfully", notes });
  } catch (error) {
    // If any error occured then return status 500 with message Internal Server error
    return res.status(500).json({
      message: "Internal Server Error",
      errors: error,
    });
  }
});
