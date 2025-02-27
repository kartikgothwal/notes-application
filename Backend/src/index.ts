import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongo from "./db";
import authRoutes from "./routes/auth";
import notesRoutes from "./routes/notes";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [!process.env.FRONTEND_DEV, "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
  })
);

// Available Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req: Request, res:Response) => {
  res.send("<h1>DevNotes Backend</h1>");
});

// Start the server
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
