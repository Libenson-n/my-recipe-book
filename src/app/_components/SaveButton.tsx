"use client";

import { Button } from "@/components/ui/button";
import { saveRecipe } from "@/server/actions/user-controller";

type SaveButtonProps = {
  recipeId: string;
  userId: string;
};

const SaveButton = ({ recipeId, userId }: SaveButtonProps) => {
  const handleSaveRecipe = () => {
    saveRecipe(recipeId, userId);
  };
  return (
    <Button
      className="mt-2 w-full bg-indigo-600 hover:bg-indigo-800"
      onClick={handleSaveRecipe}
    >
      Save
    </Button>
  );
};

export default SaveButton;
