import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, trim: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
    stock: { type: Number, default: 0 },
    sku: { type: String, trim: true, unique: true },
    isAvailable: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    images: { type: [String], default: [] },
    ratings: { type: Number, default: 0 },
    reviews: [
      {
        user: String,
        comment: String,
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
