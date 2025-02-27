const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/Users");
const JWT_SIGNATURE = process.env.JWT_SIGNATURE;

export const SignUp = async (req, res) => {
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
  // Put everything inside the try block so that if any error occur then,
  // we can handle in the catch block
  try {
    // Check if there exists a user with this email id
    let user = await User.findOne({ email: req.body.email });
    // If exists then return error with message to use different email
    if (user) {
      return res
        .status(400)
        .json({ success, message: "Email is Already Registered" });
    }
    if (req.body.password !== req.body.cpassword) {
      return res
        .status(400)
        .json({ success, message: "Password does not match" });
    }
    // If the email is not already exists in the DB then
    // make a salt of 10 characters using bcrypt
    const salt = await bcrypt.genSalt(10);
    // make a securepassword using hash function with password entered by user and salt
    const securePass = await bcrypt.hash(req.body.password, salt);
    // create a user with user data and the password
    // which we have made in the previous step
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePass,
    });
    const data = {
      user: { id: user.id },
    };
    // create a authtoken with the user id and your signature
    const authToken = jwt.sign(data, JWT_SIGNATURE);
    // Now return the auth token
    success = true;
    return res.json({
      success,
      message: "User Registered Successfully",
      authToken,
    });
    // res.json({ 'OK 200': 'User data successfully added','data':user });
  } catch (error) {
    // If any error occured then return status 500 with message Internal Server error
    console.log(error.message);
    return res.status(500).json({
      success,
      message: "Internal Server Error",
      errors: error.messsage,
    });
  }
};
