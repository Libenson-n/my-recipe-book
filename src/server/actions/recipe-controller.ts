"use server"

import { Recipe } from "@/lib/types";
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

  type AddRecipeData = {
    userId: string;
    title: string;
    description: string;
    imageUrl: string;
    ingredients: string[];
    instructions: string[];
  };
  
  type AddRecipeResult = {
    data?: Recipe;
    error?: string;
  };
  
  export const addRecipe = async (
    recipe: AddRecipeData
  ): Promise<AddRecipeResult> => {
    const userId = recipe.userId;
    const title = recipe.title;
    const description = recipe.description;
    const imageUrl = recipe.imageUrl;
    const ingredients = recipe.ingredients;
    const instructions = recipe.instructions;
  
    try {
      const recipeData = await db.recipe.create({
        data: {
          userId,
          title,
          description,
          imageUrl,
          ingredients,
          instructions,
        },
      });
  
      return { data: recipeData };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return { error: "recipe not added" };
    }
  };