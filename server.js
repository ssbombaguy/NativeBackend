import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import laptopRoutes from "./routes/laptopRoutes.js";
import phoneRoutes from "./routes/phoneRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/laptops", laptopRoutes);
app.use("/api/phones", phoneRoutes);

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
