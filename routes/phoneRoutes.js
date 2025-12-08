import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const phones = await db.collection("products")
      .find({ type: "phone" })
      .toArray();

    res.json(phones);
  } catch (err) {
    res.status(500).json({ message: "Error loading phones" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await db.collection("products").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!item) return res.status(404).json({ message: "Phone not found" });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error loading phone" });
  }
});

export default router;
