import { db } from '@/server/db'; 
import { Recipe } from '@/lib/types'; 
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type RecipePageProps = {
  params: {
    id: string;
  };
}

const RecipePage = async ({ params }: RecipePageProps) => {
  const { id } = params;

  // Fetch recipe based on ID
  const recipe = await db.recipe.findUnique({
    where: { id:id }
  });

  // Handle case where recipe is not found
  if (!recipe) {
    notFound(); // This will trigger a 404 page
  }

  return (
    <main className="">
      <Card className='m-10 border-none shadow-none'>
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        {/* <CardDescription>{recipe.description}</CardDescription> */}
      </CardHeader>
      <img src={recipe.imageUrl} alt={recipe.title} />
      <ul className='p-6 border-b'>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}
          </li>
        ))}
      </ul>
      <ul className='p-6 border-b'>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>
            {index + 1}. {instruction}
          </li>
        ))}
      </ul>
      <Link href="/recipes">Back to recipes</Link>
    </Card>
    </main>
  );
};

export default RecipePage;
