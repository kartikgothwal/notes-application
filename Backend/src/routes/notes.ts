import express from "express";
import { AddNote } from "../controllers/notes/addnote";
import { DeleteNote } from "../controllers/notes/deletenote";
import { GetNotes } from "../controllers/notes/getnotes";
import { UpdateNote } from "../controllers/notes/updatenote";
import fetchuser from "../middleware/fetchuser";
import { AddNotesValidation } from "../validation";

const router = express.Router();

router.get(
  "/fetchallnotes",
  fetchuser as express.RequestHandler,
  GetNotes as express.RequestHandler
);

router.post(
  "/addnote",
  AddNotesValidation,
  fetchuser as express.RequestHandler,
  AddNote as unknown as express.RequestHandler
);

router.put(
  "/updatenote/:id",
  fetchuser as express.RequestHandler,
  UpdateNote as express.RequestHandler
);

router.delete(
  "/deletenote/:id",
  fetchuser as express.RequestHandler,
  DeleteNote as express.RequestHandler
);

export default router;
