// src/routes/pokemonRoutes.js
import express from "express";
import { getPokemonByName } from "../pokemonService.js";

const router = express.Router();

/**
 * GET /api/pokemon/:name
 * Example: /api/pokemon/pikachu
 */
router.get("/:name", async (req, res) => {
  const { name } = req.params;

  if (!name || !name.trim()) {
    return res.status(400).json({
      error: "Pokemon name is required"
    });
  }

  try {
    const result = await getPokemonByName(name);
    return res.json(result);
  } catch (err) {
    const status = err.statusCode || 500;
    return res.status(status).json({
      error: err.message || "Unexpected error"
    });
  }
});

export default router;
