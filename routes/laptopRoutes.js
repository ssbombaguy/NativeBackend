import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const laptops = await db.collection("products") 
      .find({ type: "laptop" })
      .toArray();

    res.json(laptops);
  } catch (err) {
    res.status(500).json({ message: "Error getting laptops" });
  }
});

export default router;
