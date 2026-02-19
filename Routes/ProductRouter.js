import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import parser from "../middlewares/upload.js";

const router = express.Router();

router.post("/", parser.array("images", 5), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", parser.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
