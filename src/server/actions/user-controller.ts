"use server";

import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getUserIdWithClerkId = async () => {
  const clerkUser = await currentUser();
  const clerkUserId = clerkUser?.id;

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: clerkUserId,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserRecipes = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { savedRecipes: true },
  });
  return user?.savedRecipes || [];
};

export const saveRecipe = async (recipeId: string, userId: string) => {
  try {
    const existingRecipes = await getUserRecipes(userId);

    if (existingRecipes.includes(recipeId)) {
      const removeRecipe = existingRecipes.filter(
        (recipe) => recipe !== recipeId,
      );
      await db.user.update({
        where: { id: userId },
        data: {
          savedRecipes: {
            set: removeRecipe,
          },
        },
      });
    } else {
      // Create a new array with the recipeId added, ensuring no duplicates
      const updatedRecipes = [...new Set([...existingRecipes, recipeId])];

      await db.user.update({
        where: { id: userId },
        data: {
          savedRecipes: {
            set: updatedRecipes,
          },
        },
      });
      revalidatePath("/");
      console.log("Recipe saved successfully");
    }
  } catch (error) {
    console.error("Error saving recipe:", error);
  }
};

export const getSavedRecipes = async (savedRecipes: string[]) => {
  try {
    const allRecipes = await db.recipe.findMany();
    const userSavedRecipes = allRecipes.filter((recipe) =>
      savedRecipes.includes(recipe.id),
    );
    return userSavedRecipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { recipes: [] }; // Return an empty array on error
  }
};
