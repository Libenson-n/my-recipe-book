"use client";

import { Button } from "@/components/ui/button";
import { saveRecipe } from "@/server/actions/user-controller";
import { Bookmark } from "lucide-react";

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
      variant={"ghost"}
      className="mt-2 w-full"
      onClick={handleSaveRecipe}
    >
      Add to your cookbook <Bookmark className="text-pink-600" />
    </Button>
  );
};

export default SaveButton;
