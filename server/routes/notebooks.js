import express from "express";
import { getNotebooks, getNotebook, createNotebook, editNotebook, deleteNotebook, addNotebookToFavourite, getFavouriteNotebooks } from "../controllers/notebook.js";

const router = express.Router();

router.get("/:userId", getNotebooks);
router.get("/get-favourites/:userId", getFavouriteNotebooks);
router.get("/get-notebook/:id", getNotebook );
router.post("/create-notebook", createNotebook );
router.put("/edit-notebook", editNotebook );
router.delete("/:id", deleteNotebook);
router.put("/add-notebook-to-favourite/:id", addNotebookToFavourite);

export default router;