import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  description: String,
  fullDescription: String,
  image: String,

  category: {
    type: String,
    enum: ["phone", "laptop"],
    required: true
  }
});

export default mongoose.model("Product", ProductSchema);
