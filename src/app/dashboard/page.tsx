import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getSavedRecipes,
  getUserIdWithClerkId,
} from "@/server/actions/user-controller";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRecipesByUserId } from "@/server/actions/recipe-controller";
import Link from "next/link";
import { Recipe } from "@/lib/types";
import { getCommentsByUserId } from "@/server/actions/comment-controller";

const DashboardPage = async () => {
  const user = await getUserIdWithClerkId();

  if (!user) return <p>Loading...</p>;

  const userId = user?.id;
  const userRecipes = await getRecipesByUserId(userId);

  const userSavedRecipes = await getSavedRecipes(user.savedRecipes);

  const userComments = await getCommentsByUserId(userId);

  return (
    <main className="">
      <Card className="m-10">
        <CardHeader>
          <CardTitle>{user.userName}</CardTitle>
          {user.imageUrl && (
            <Image
              src={user.imageUrl}
              width={200}
              height={200}
              alt="profile image"
            />
          )}
        </CardHeader>
        <CardContent>
          <Card>
            <CardContent>
              <Tabs defaultValue="saved" className="p-6">
                <TabsList>
                  <TabsTrigger value="saved">Saved Recipes</TabsTrigger>
                  <TabsTrigger value="created">Your Cookbook</TabsTrigger>
                  <TabsTrigger value="comments">Your Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="saved">
                  <ul>
                    {userSavedRecipes &&
                      // TODO: create a generic type instead of using any
                      (userSavedRecipes as any).map((recipe: Recipe) => (
                        <li key={recipe.id}>
                          <Link
                            href={`/recipes/${recipe.id}`}
                            className="flex items-center gap-3 border p-1"
                          >
                            <Image
                              src={recipe.imageUrl}
                              width={64}
                              height={64}
                              alt={recipe.title}
                              className="h-16 w-16 rounded-full"
                            />
                            <p>{recipe.title}</p>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </TabsContent>
                <TabsContent value="created">
                  <ul>
                    {userRecipes?.map((recipe) => (
                      <li key={recipe.id}>
                        <Link
                          href={`/recipes/${recipe.id}`}
                          className="flex items-center gap-3 border p-1"
                        >
                          <Image
                            src={recipe.imageUrl}
                            width={64}
                            height={64}
                            alt={recipe.title}
                            className="h-16 w-16 rounded-full"
                          />
                          <p>{recipe.title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="comments">
                  <ul>
                    {userComments &&
                      userComments.map((comment) => (
                        <li key={comment.id}>
                          <Link
                            href={`/recipes/${comment.recipeId}`}
                            className="flex items-center gap-3 border p-1"
                          >
                            <p>{comment.content}</p>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </main>
  );
};

export default DashboardPage;
