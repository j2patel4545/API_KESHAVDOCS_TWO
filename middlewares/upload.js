import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 800, crop: "limit" }],
  },
});

const parser = multer({ storage });

export default parser;
