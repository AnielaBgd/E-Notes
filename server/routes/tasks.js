import express from "express";
import { addTask, getTasks, getTask, editTask, deleteTask } from "../controllers/task.js";

const router = express.Router();

router.post("/add-task", addTask)
router.get("/get-tasks/:id", getTasks)
router.get("/get-task/:id", getTask)
router.put("/edit-task/", editTask)
router.delete("/:id", deleteTask)

export default router;