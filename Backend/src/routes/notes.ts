import express from "express";
import { AddNote } from "../controllers/notes/addnote";
import { DeleteNote } from "../controllers/notes/deletenote";
import { GetNotes } from "../controllers/notes/getnotes";
import { UpdateNote } from "../controllers/notes/updatenote";
import fetchuser from "../middleware/fetchuser";
import { body } from "express-validator";

const router = express.Router();

// ROUTE 1: Get all notes
router.get(
  "/fetchallnotes",
  fetchuser as express.RequestHandler,
  GetNotes as express.RequestHandler
);

// ROUTE 2: Add a new note
router.post(
  "/addnote",
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters"),
  ],
  fetchuser as express.RequestHandler,
  AddNote as unknown as express.RequestHandler
);

// ROUTE 3: Update a note
router.put(
  "/updatenote/:id",
  fetchuser as express.RequestHandler,
  UpdateNote as express.RequestHandler
);

// ROUTE 4: Delete a note
router.delete(
  "/deletenote/:id",
  fetchuser as express.RequestHandler,
  DeleteNote as express.RequestHandler
);

export default router;
