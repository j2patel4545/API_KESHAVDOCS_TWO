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
  <title>Todo & Product API Documentation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(to right, #e0f2fe, #fef3c7);
    }
    h1, h2 {
      color: #1e3a8a;
    }
    .method {
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
      color: white;
      text-transform: uppercase;
      font-size: 0.875rem;
    }
    .GET { background-color: #16a34a; }
    .POST { background-color: #2563eb; }
    .PUT { background-color: #f59e0b; }
    .DELETE { background-color: #dc2626; }
    code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.875rem;
    }
    .table-container::-webkit-scrollbar {
      height: 6px;
    }
    .table-container::-webkit-scrollbar-thumb {
      background-color: #9ca3af;
      border-radius: 3px;
    }
  </style>
</head>
<body class="min-h-screen flex flex-col">
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 class="text-4xl font-bold text-blue-900">Todo & Product API</h1>
      <p class="text-sm text-gray-600">Base URL: <code>https://api-keshavdocs-two-2.onrender.com/</code></p>
    </div>
  </header>

  <main class="flex-grow container mx-auto p-6 space-y-12">
    
    <!-- Todo Routes -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Todo Routes</h2>
      <div class="table-container overflow-x-auto shadow-lg rounded-xl">
        <table class="min-w-full table-auto border border-gray-200 bg-white">
          <thead class="bg-blue-100 text-blue-900">
            <tr>
              <th class="border px-4 py-3 text-left">Method</th>
              <th class="border px-4 py-3 text-left">Endpoint</th>
              <th class="border px-4 py-3 text-left">Fields / Query Params</th>
              <th class="border px-4 py-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="hover:bg-blue-50 transition-colors">
              <td class="border px-4 py-2"><span class="method POST">POST</span></td>
              <td class="border px-4 py-2"><code>/todos</code></td>
              <td class="border px-4 py-2">title, description, status, priority, dueDate, tags</td>
              <td class="border px-4 py-2">Create a new Todo</td>
            </tr>
            <tr class="hover:bg-blue-50 transition-colors">
              <td class="border px-4 py-2"><span class="method GET">GET</span></td>
              <td class="border px-4 py-2"><code>/todos</code></td>
              <td class="border px-4 py-2">Optional query: status, tag</td>
              <td class="border px-4 py-2">Get all Todos</td>
            </tr>
            <tr class="hover:bg-blue-50 transition-colors">
              <td class="border px-4 py-2"><span class="method GET">GET</span></td>
              <td class="border px-4 py-2"><code>/todos/:id</code></td>
              <td class="border px-4 py-2">id (path param)</td>
              <td class="border px-4 py-2">Get a single Todo</td>
            </tr>
            <tr class="hover:bg-blue-50 transition-colors">
              <td class="border px-4 py-2"><span class="method PUT">PUT</span></td>
              <td class="border px-4 py-2"><code>/todos/:id</code></td>
              <td class="border px-4 py-2">title, description, status, priority, dueDate, tags</td>
              <td class="border px-4 py-2">Update a Todo</td>
            </tr>
            <tr class="hover:bg-blue-50 transition-colors">
              <td class="border px-4 py-2"><span class="method DELETE">DELETE</span></td>
              <td class="border px-4 py-2"><code>/todos/:id</code></td>
              <td class="border px-4 py-2">id (path param)</td>
              <td class="border px-4 py-2">Soft delete a Todo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Product Routes -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Product Routes</h2>
      <div class="table-container overflow-x-auto shadow-lg rounded-xl">
        <table class="min-w-full table-auto border border-gray-200 bg-white">
          <thead class="bg-yellow-100 text-yellow-900">
            <tr>
              <th class="border px-4 py-3 text-left">Method</th>
              <th class="border px-4 py-3 text-left">Endpoint</th>
              <th class="border px-4 py-3 text-left">Fields / Multipart</th>
              <th class="border px-4 py-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="hover:bg-yellow-50 transition-colors">
              <td class="border px-4 py-2"><span class="method POST">POST</span></td>
              <td class="border px-4 py-2"><code>/products</code></td>
              <td class="border px-4 py-2">name*, description, category, price*, discount, currency, stock, sku, images[]</td>
              <td class="border px-4 py-2">Create a new Product (supports multiple images)</td>
            </tr>
            <tr class="hover:bg-yellow-50 transition-colors">
              <td class="border px-4 py-2"><span class="method GET">GET</span></td>
              <td class="border px-4 py-2"><code>/products</code></td>
              <td class="border px-4 py-2">None</td>
              <td class="border px-4 py-2">Get all Products</td>
            </tr>
            <tr class="hover:bg-yellow-50 transition-colors">
              <td class="border px-4 py-2"><span class="method GET">GET</span></td>
              <td class="border px-4 py-2"><code>/products/:id</code></td>
              <td class="border px-4 py-2">id (path param)</td>
              <td class="border px-4 py-2">Get single Product by ID</td>
            </tr>
            <tr class="hover:bg-yellow-50 transition-colors">
              <td class="border px-4 py-2"><span class="method PUT">PUT</span></td>
              <td class="border px-4 py-2"><code>/products/:id</code></td>
              <td class="border px-4 py-2">name, description, category, price, discount, currency, stock, sku, images[]</td>
              <td class="border px-4 py-2">Update Product (add new images supported)</td>
            </tr>
            <tr class="hover:bg-yellow-50 transition-colors">
              <td class="border px-4 py-2"><span class="method DELETE">DELETE</span></td>
              <td class="border px-4 py-2"><code>/products/:id</code></td>
              <td class="border px-4 py-2">id (path param)</td>
              <td class="border px-4 py-2">Soft delete Product</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    
  </main>

  <footer class="bg-gray-900 text-gray-300 py-6 text-center shadow-inner">
    &copy; ${new Date().getFullYear()} <strong>KeshavDocs</strong> | 
    <a href="https://www.j2codes.in" target="_blank" class="text-blue-400 hover:underline">www.j2codes.in</a>
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
