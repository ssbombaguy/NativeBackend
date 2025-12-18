import express from "express";
import { db } from "../config/db.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const laptops = await db
      .collection("laptops")
      .find({})
      .toArray();
    res.json(laptops);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const laptop = await db
      .collection("laptops")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!laptop) return res.status(404).json({ message: "Laptop not found" });
    res.json(laptop);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
