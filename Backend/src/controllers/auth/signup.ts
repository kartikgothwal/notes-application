import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/Users";
import { Request, Response } from "express";

const JWT_SIGNATURE = process.env.JWT_SIGNATURE as string;

export const SignUp = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  let success = false;

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success,
      message: "Enter Correct Credentials",
      errors: errors.array(),
    });
  }

  try {
    let user = await User.findOne({ email: req.body.email });

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

    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePass,
    });

    const data = {
      user: { id: user.id },
    };

    const authToken = jwt.sign(data, JWT_SIGNATURE);
    success = true;

    return res.json({
      success,
      message: "User Registered Successfully",
      authToken,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
    return res.status(500).json({
      success,
      message: "Internal Server Error",
      errors: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
