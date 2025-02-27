const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/Users");
const JWT_SIGNATURE = process.env.JWT_SIGNATURE;

export const SignIn = async (req, res) => {
  const errors = validationResult(req);
  let success = false;
  //  If there is any error return error 400 status with the error
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success,
      message: "Enter Correct Credentials",
      errors: errors.array(),
    });
  }
  // Using destructuring get the values of email and password
  const { email, password } = req.body;
  // Put everything inside the try block so that if any error occur then,
  // we can handle in the catch block
  try {
    // Check if there exists a user with this email id
    const user = await User.findOne({ email: email });
    // If doesn't exists then return error with message to use correct credentials
    if (!user) {
      return res
        .status(400)
        .json({ success, message: "try to log in with correct credentials" });
    }
    // Compare the password user has enered with the saved password
    // do not worry about hash and salt node js will take care care of that.
    const comparePassword = await bcrypt.compare(password, user.password);
    // If password doesn't match then return error with message to use correct credentials
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success, message: "try to log in with correct credentials" });
    }

    //else  create a authtoken with the user id and your signature
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SIGNATURE);
    success = true;
    // Now return the auth token
    res.json({
      success,
      message: "User Logged In Successfully",
      authToken,
      data,
    });
  } catch (error) {
    // If any error occured then return status 500 with message Internal Server error
    return res
      .status(500)
      .json({ success, message: "Internal Server Error", errors: error });
  }
};
