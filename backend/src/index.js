// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import { PORT } from "./config.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Pokemon routes (REST)
app.use("/api/pokemon", pokemonRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler (fallback)
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server listening on http://localhost:${PORT}`);
});
