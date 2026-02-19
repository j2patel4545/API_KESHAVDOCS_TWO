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
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo & Product API</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

      body {
        font-family: 'Inter', sans-serif;
        background: linear-gradient(to right, #f0f4f8, #d9e2ec);
        color: #333;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: space-between;
      }

      .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 40px 20px;
        text-align: center;
      }

      h1 {
        font-size: 3rem;
        color: #1e3a8a;
        margin-bottom: 20px;
      }

      p {
        font-size: 1.25rem;
        color: #334155;
      }

      a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
      }

      a:hover {
        text-decoration: underline;
      }

      footer {
        background: #1e293b;
        color: #f1f5f9;
        padding: 20px 0;
        text-align: center;
        font-size: 0.875rem;
      }

      footer a {
        color: #3b82f6;
        text-decoration: none;
      }

      footer a:hover {
        text-decoration: underline;
      }

      .highlight {
        color: #16a34a;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to <span class="highlight">Todo & Product API</span></h1>
      <p>
        Build and test your Todos and Products easily with this API.<br />
        Use the endpoints for <strong>CRUD operations</strong> and image uploads with Cloudinary.
      </p>
      <p>Check more projects at <a href="https://www.j2codes.in" target="_blank">www.j2codes.in</a></p>
    </div>

    <footer>
      &copy; ${new Date().getFullYear()} <strong>KeshavDocs</strong>. All Rights Reserved. | 
      <a href="https://www.j2codes.in" target="_blank">www.j2codes.in</a>
    </footer>
  </body>
  </html>
  `);
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
