"use server";

import { recipes } from "@/lib/data";
import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";

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

    console.log("Recipe saved successfully");
  } catch (error) {
    console.error("Error saving recipe:", error);
  }
};
