import express from "express";
import Products from "../models/Products.js";
const router = express.Router();

router.get("/phones", async (req, res) => {
  const products = await Products.find({ category: "phones" });
  res.json(products);
});

router.get("/phones/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Phone not found" });
  }
  res.json(product);
});

router.get("/laptops", async (req, res) => {
  const products = await Product.find({ category: "laptops" });
  res.json(products);
});

router.get("/laptops/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Laptop not found" });
  }
  res.json(product);
});

export default router;