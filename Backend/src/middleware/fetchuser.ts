import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const fetchuser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ success: false, message: "Please Authenticate using correct Credentials" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SIGNATURE as string);
    if (typeof data !== 'string' && 'user' in data) {
      req.user = data.user;
    } else {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Please Authenticate using correct Credentials" });
  }
};

export default fetchuser;