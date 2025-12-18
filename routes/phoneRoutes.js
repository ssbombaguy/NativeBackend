import express from "express";
import { db } from "../config/db.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const phones = await db
      .collection("phones")
      .find({})
      .toArray();
    res.json(phones);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const phone = await db
      .collection("phones")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!phone) return res.status(404).json({ message: "Phone not found" });
    res.json(phone);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
