import express from "express";
import { AddNote } from "../controllers/notes/addnote";
import { DeleteNote } from "../controllers/notes/deletenote";
import { GetNotes } from "../controllers/notes/getnotes";
import { UpdateNote } from "../controllers/notes/updatenote";
import fetchuser from "../middleware/fetchuser";

const router = express.Router();

// ROUTE 1: Get all the notes of user using :  GET -> "/api/notes/fetchallnotes" . Note: ' Login Required'.
router.get("/fetchallnotes", fetchuser, GetNotes);

// ROUTE 2: Add new notes for loggedIn user using :  POST -> "/api/notes/addnote" . Note: ' Login Required'.
router.post("/addnote", fetchuser, AddNote);

// ROUTE 3: Update any existing note for loggedIn user using :  PUT -> "/api/notes/updatenote/:id" . Note: ' Login Required'.
router.put("/updatenote/:id", fetchuser, UpdateNote);

// ROUTE 4: Delete any note for loggedIn user using :  DELETE -> "/api/notes/deletenote/:id" . Note: ' Login Required'.
router.delete("/deletenote/:id", fetchuser, DeleteNote);

export default router;