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
import { Button } from "@/components/ui/button";


const RecipeList = async () => {
  const { recipes } = await getRecipes();

  if (!recipes || recipes.length === 0) {
    return <p>No recipes available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10 items-center justify-center">
      {recipes.map((recipe: Recipe) => (
        <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
          <Card className="min-h-[420px] p-0">
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
                  className="bg-cover shadow-md w-full h-[200px] "
                />
              </CardContent>
              
              <form className="p-6">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-800">Save</Button>
              </form>
              
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
