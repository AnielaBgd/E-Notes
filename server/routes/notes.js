import express from "express";
import { getNotes, getNote, addNote, deleteNote, addNoteToFavourites } from "../controllers/note.js";

const router = express.Router();

router.get("/get-notes/:userId", getNotes);
router.get("/get-note/:id", getNote);
router.post("/add-note", addNote);
router.delete("/delete-note/:id", deleteNote);
router.put("/add-note-to-favourite/:id", addNoteToFavourites);

export default router;