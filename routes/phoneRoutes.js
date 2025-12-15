import express from "express";
import { db } from "../config/db.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const phones = await db
    .collection("products")
    .find({ type: "phones" })
    .toArray();

  res.json(phones);
});

router.get("/:id", authMiddleware, async (req, res) => {
  const phones = await db
    .collection("products")
    .findOne({ _id: new ObjectId(req.params.id) });

  res.json(phones);
});

export default router;
