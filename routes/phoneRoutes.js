import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const phones = await db.collection("products")
      .find({ type: "phone" })
      .toArray();

    res.json(phones);
  } catch (err) {
    res.status(500).json({ message: "Error getting phones" });
  }
});

export default router;
