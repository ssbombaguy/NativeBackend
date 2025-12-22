import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: "7d" });

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: "Registered" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "Not found" });

  const ok = await user.comparePassword(req.body.password);
  if (!ok) return res.status(400).json({ message: "Wrong password" });

  res.json({
    token: generateToken(user._id),
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  });
});

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.json(user);
});

router.put("/me", authMiddleware, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.userId,
    req.body,
    { new: true }
  ).select("-password");

  res.json(user);
});

export default router;