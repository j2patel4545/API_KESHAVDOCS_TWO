import express from "express";
import dotenv from "dotenv";
import { DatabaseConnection } from "./config/Db.js";
import TodoRouter from "./Routes/TodoRouter.js";
import ProductRouter from "./Routes/ProductRouter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4567;

app.use(cors());
app.use(express.json());

app.use("/api/todos", TodoRouter);
app.use("/api/products", ProductRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express + MongoDB + Todo & Product API!");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

DatabaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
