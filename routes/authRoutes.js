import express from "express";
import { db } from "../config/db.js";
import jwt from "jsonwebtoken"; 
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/jwt.js";


const router = express.Router();

router.post("/register", async (req, res) => {
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

  res.json({ message: "Registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  });
});

router.get("/check", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) return res.status(401).json({ message: "Invalid token" });

    res.json({ valid: true });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});



export default router;
