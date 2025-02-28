import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongo from "./db";
import authRoutes from "./routes/auth";
import notesRoutes from "./routes/notes";
import helmet from "helmet";

// Load environment variables from .env file
dotenv.config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>DevNotes Backend</h1>");
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
