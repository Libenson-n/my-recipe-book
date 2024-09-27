import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserIdWithClerkId } from "@/server/actions/user-controller";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recipes } from "@/lib/data";

const DashboardPage = async () => {
  const user = await getUserIdWithClerkId();

  if (!user) return <p>Loading...</p>;
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
                  <ul></ul>
                </TabsContent>
                <TabsContent value="created">
                  Change your password here.
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
