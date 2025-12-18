import express from "express";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await db.collection("users").findOne({ email });
    if (exists) return res.status(400).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      firstName,
      lastName,
      email,
      phone,
      password: hashed,
    });

    res.status(201).json({ message: "Registered" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Wrong password" });

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/check", authMiddleware, async (req, res) => {
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(req.user.userId) });

  if (!user) return res.status(401).json({ message: "Invalid token" });

  res.json({ valid: true });
});

export default router;
