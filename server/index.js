import express from "express";
import authRoutes from "./routes/auth.js";
import notebookRoutes from "./routes/notebooks.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notebooks", notebookRoutes);


app.listen(5000, () => {
    console.log("Connected!")
});