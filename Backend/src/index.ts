import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongo from "./db";
import authRoutes from "./routes/auth";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/user";
import helmet from "helmet";
import morgan from "morgan";

// Load environment variables from .env file
dotenv.config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

app.use(morgan(":url \n :status \n :response-time ms \n\n"));

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>DevNotes Backend</h1>");
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
