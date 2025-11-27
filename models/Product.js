import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,  
});

export default mongoose.model("Product", productSchema);
