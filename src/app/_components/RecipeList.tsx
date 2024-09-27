import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { getRecipes } from "@/server/actions/recipe-controller";
import SaveButton from "./SaveButton";
import { getUserIdWithClerkId } from "@/server/actions/user-controller";

const RecipeList = async () => {
  const { recipes } = await getRecipes();
  const user = await getUserIdWithClerkId();
  const userId = user?.id;

  if (!recipes || recipes.length === 0) {
    return <p>No recipes available.</p>;
  }

  return (
    <div className="grid grid-cols-1 items-center justify-center gap-4 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {recipes.map((recipe: Recipe) => (
        <Card className="min-h-[420px] p-0">
          <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
            <CardHeader>
              <CardTitle>{recipe.title}</CardTitle>
              <CardDescription>{recipe.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Image
                src={recipe.imageUrl}
                height={200}
                width={200}
                alt={recipe.title}
                className="h-[200px] w-full bg-cover shadow-md"
              />
            </CardContent>
          </Link>
          {userId && <SaveButton recipeId={recipe.id} userId={userId} />}
        </Card>
      ))}
    </div>
  );
};

export default RecipeList;
