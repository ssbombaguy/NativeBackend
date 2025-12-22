import express from "express";
import Product from "../models/Product.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:category", authMiddleware, async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.json(products);
});

router.get("/:category/:id", authMiddleware, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

export default router;