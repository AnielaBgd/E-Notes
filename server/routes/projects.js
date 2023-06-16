import express from "express";
import { addProject, editProject, getProject, getProjects } from "../controllers/project.js";

const router = express.Router();

router.post("/add-project", addProject)
router.get("/get-projects/:id", getProjects)
router.put("/edit-project", editProject)
router.get("/get-project/:id", getProject)

export default router;