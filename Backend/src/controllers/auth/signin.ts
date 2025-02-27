import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/Users";
import { JWT_SIGNATURE } from "../../config"; // Assuming you have a config file for constants

export const SignIn = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  let success = false;

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success,
      message: "Enter Correct Credentials",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ success, message: "try to log in with correct credentials" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({ success, message: "try to log in with correct credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SIGNATURE);
    success = true;

    return res.json({
      success,
      message: "User Logged In Successfully",
      authToken,
      data,
    });
  } catch (error) {
    return res.status(500).json({ success, message: "Internal Server Error", errors: error });
  }
};