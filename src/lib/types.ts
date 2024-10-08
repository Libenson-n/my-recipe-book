export type User = {
    id: string;
    userName: string;
    email: string;
    password: string;
    imageUrl?: string;
    createdAt: Date;
  };

export type Recipe = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    ingredients: string[];
    instructions: string[];
    userId: string;
    comments?: string[];
  };
 
export type Comment = {
  id: string;
  content: string;
  userId: string;
  userName: string;
  recipeId: string;
}
