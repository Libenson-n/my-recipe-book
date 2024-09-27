import { db } from "@/server/db";
import { Recipe } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CommentBox from "./_components/CommentBox";
import { checkUser } from "@/lib/checkUser";
import CommentSection from "./_components/CommentSection";

type RecipePageProps = {
  params: {
    id: string;
  };
};

const RecipePage = async ({ params }: RecipePageProps) => {
  const { id } = params;
  const user = await checkUser();

  // Fetch recipe based on ID
  const recipe = await db.recipe.findUnique({
    where: { id: id },
  });

  // Handle case where recipe is not found
  if (!recipe) {
    notFound(); // This will trigger a 404 page
  }

  return (
    <main className="">
      <Card className="m-10 border-none shadow-none">
        <CardHeader>
          <CardTitle>{recipe.title}</CardTitle>
          {/* <CardDescription>{recipe.description}</CardDescription> */}
        </CardHeader>
        <img src={recipe.imageUrl} alt={recipe.title} />
        <ul className="border-b p-6">
          <h3 className="text-xl font-semibold">What you will need</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <ul className="border-b p-6">
          <h3 className="text-xl font-semibold">How to make it</h3>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>
              {index + 1}. {instruction}
            </li>
          ))}
        </ul>
      </Card>
      {user && <CommentBox recipeId={id} user={user} />}
      <CommentSection recipeId={id} />
    </main>
  );
};

export default RecipePage;
