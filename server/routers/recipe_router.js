import express from "express";
import Recipe from "../models/recipe.js";
import { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from "../controllers/recipe_controller.js";

const router = express.Router();

router.get("/", getAllRecipes);

router.post("/", createRecipe);

router.get("/:id", getRecipeById);

router.put("/:id", updateRecipe);

router.delete("/:id", deleteRecipe);

export default router;