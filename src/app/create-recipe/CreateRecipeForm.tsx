"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { addRecipe } from "@/server/actions/recipe-controller";
import { getUserIdWithClerkId } from "@/server/actions/user-controller";



const CreateRecipeForm = () => {
  const [userId, setUserId] = useState<string>()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);



  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserIdWithClerkId()
      
    setUserId(user?.id)
    }
    fetchUser()
  },[])

  const handleIngredientsInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    ingredients[index] = value;
    setIngredients([...ingredients]);
  };

  const removeIngredient = (index: number) => {
    ingredients.splice(index, 1);
    setIngredients([...ingredients]);
  };
  const handleInstructionsInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    instructions[index] = value;
    setInstructions([...instructions]);
  };

  const removeInstruction = (index: number) => {
    instructions.splice(index, 1);
    setInstructions([...instructions]);
  };

  const addField = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    target.name === "ingredient"
      ? setIngredients([...ingredients, ""])
      : setInstructions([...instructions, ""]);
  };

  if (!userId) return <p>Loading...</p>

  const handleSubmit = () => {
    const recipe = {
      userId,
      title,
      description,
      imageUrl,
      ingredients,
      instructions,
    };
    addRecipe(recipe)
  };

  return (
    <main className="h-screen">
      <Card className="mx-auto mt-20 max-w-[80vw] p-5">
        <CardHeader>
          <CardTitle>Write your recipe</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <form action={handleSubmit}>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Name of your recipe"
            />
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
            />
            <Label>Image URL</Label>
            <Input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter a URL"
            />
            <Label>Ingredients</Label>
            <div>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex">
                  <Input
                    type="text"
                    name="ingredients"
                    value={ingredient}
                    onChange={(e) => handleIngredientsInput(e, index)}
                    placeholder="Enter ingredients"
                  />
                  {ingredients.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                    >
                      ❌
                    </button>
                  ) : null}
                </div>
              ))}
              <button
                type="button"
                name="ingredient"
                onClick={(e) => addField(e)}
              >
                ➕Add ingredient
              </button>
            </div>
            <Label>Instructions</Label>
            <div>
              {instructions.map((instruction, index) => (
                <div key={index} className="flex">
                  <Input
                    type="text"
                    name="instructions"
                    value={instruction}
                    onChange={(e) => handleInstructionsInput(e, index)}
                    placeholder="Enter instructions"
                  />
                  {instructions.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeInstruction(index)}
                    >
                      ❌
                    </button>
                  ) : null}
                </div>
              ))}
              <button
                type="button"
                name="instruction"
                onClick={(e) => addField(e)}
              >
                ➕Add instruction
              </button>
            </div>
            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default CreateRecipeForm;
