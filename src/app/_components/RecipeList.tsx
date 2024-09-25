import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { getRecipes } from "@/server/actions/recipe-controller";

const RecipeList = async () => {
  const { recipes } = await getRecipes();

  if (!recipes || recipes.length === 0) {
    return <p>No recipes available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10 items-center justify-center">
      {recipes.map((recipe: Recipe) => (
        <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
          <Card className="min-h-[420px]">
            <CardHeader>
              <CardTitle>{recipe.title}</CardTitle>
              <CardContent>
                <Image
                  src={recipe.imageUrl}
                  height={200}
                  width={200}
                  alt={recipe.title}
                  className="bg-cover rounded-sm w-full h-[200px] "
                />
              </CardContent>
              <CardFooter>{recipe.description}</CardFooter>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
