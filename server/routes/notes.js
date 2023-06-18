import express from "express";
import { getNotes, getNote, addNote, deleteNote, addNoteToFavourites, editNote, getFavouriteNotes, getNotesForNotebook } from "../controllers/note.js";

const router = express.Router();

router.get("/get-notes/:userId", getNotes);
router.get("/get-favourites/:userId", getFavouriteNotes);
router.get("/get-note/:id", getNote);
router.get("/get-notes-for-notebook/:id", getNotesForNotebook);
router.post("/add-note", addNote);
router.delete("/delete-note/:id", deleteNote);
router.put("/add-note-to-favourite/:id", addNoteToFavourites);
router.put("/edit-note", editNote);

export default router;