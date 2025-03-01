import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/Users";
const JWT_SIGNATURE = process.env.JWT_SIGNATURE as string;

export const SignIn = async (req: Request, res: Response): Promise<any> => {
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
      return res.status(404).json({ success, message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ success, message: "Incorrect Password" });
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
      id: user.id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success, message: "Internal Server Error", errors: error });
  }
};
