"use server"

import { db } from "@/server/db";

export const getRecipes = async () => {
    try {
      const recipes = await db.recipe.findMany();
      return { recipes };
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return { recipes: [] }; // Return an empty array on error
    }
  };