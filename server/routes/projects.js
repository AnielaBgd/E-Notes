import express from "express";
import { addProject, editProject, getProject, getProjects, deleteProject } from "../controllers/project.js";

const router = express.Router();

router.post("/add-project", addProject)
router.get("/get-projects/:id", getProjects)
router.put("/edit-project", editProject)
router.get("/get-project/:id", getProject)
router.delete("/:id", deleteProject)

export default router;