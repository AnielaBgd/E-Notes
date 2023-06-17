import express from "express";
import authRoutes from "./routes/auth.js";
import notebookRoutes from "./routes/notebooks.js";
import noteRoutes from "./routes/notes.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/tasks.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notebooks", notebookRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);



app.listen(5000, () => {
    console.log("Connected!")
});