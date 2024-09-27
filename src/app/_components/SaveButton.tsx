"use client";

import { Button } from "@/components/ui/button";

import { saveRecipe } from "@/server/actions/user-controller";
import { Bookmark, BookmarkCheck } from "lucide-react";

type SaveButtonProps = {
  recipeId: string;
  user: { id: string; savedRecipes: string[] };
};

const SaveButton = ({ recipeId, user }: SaveButtonProps) => {
  const handleSaveRecipe = () => {
    const userId = user.id;
    saveRecipe(recipeId, userId);
  };

  console.log(user.savedRecipes);
  return (
    <Button
      variant={"ghost"}
      className="mt-2 w-full"
      onClick={handleSaveRecipe}
    >
      {user.savedRecipes.includes(recipeId) ? (
        <>
          In your cookbook <BookmarkCheck className="text-pink-500" />
        </>
      ) : (
        <>
          Add to your cookbook <Bookmark className="text-pink-500" />
        </>
      )}
    </Button>
  );
};

export default SaveButton;
