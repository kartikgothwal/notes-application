const User = require("../models/User");
export const GetUser = async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    // If doesn't exists then return error with message to use correct credentials
    success = true;
    return res.json({
      success,
      message: "User Data fetched Successfully",
      user,
    });
  } catch (error) {
    // If any error occured then return status 500 with message Internal Server error
    console.log(error.message);
    return res
      .status(500)
      .json({ success, message: "Internal Server Error", errors: error });
  }
};
