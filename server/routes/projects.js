import express from "express";
import { addProject, addProjectToFavourite, editProject, getProject, getProjects, deleteProject, getFavouriteProjects } from "../controllers/project.js";

const router = express.Router();

router.post("/add-project", addProject)
router.get("/get-projects/:id", getProjects)
router.get("/get-favourites/:id", getFavouriteProjects)
router.put("/edit-project", editProject)
router.get("/get-project/:id", getProject)
router.delete("/:id", deleteProject)
router.put("/add-project-to-favourite/:id", addProjectToFavourite)

export default router;