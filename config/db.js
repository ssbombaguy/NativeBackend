import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
export let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db("Native");
    console.log("MongoDB Connected (Native Driver)");
  } catch (err) {
    console.error("DB ERROR:", err);
  }
}
