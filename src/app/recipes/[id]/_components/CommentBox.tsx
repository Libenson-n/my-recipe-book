"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { addComment } from "@/server/actions/comment-controller";

type CommentBoxProps = {
  recipeId: string;
  user: { id: string; userName: string };
};

const CommentBox = ({ recipeId, user }: CommentBoxProps) => {
  const handleSubmit = (formData: FormData) => {
    addComment(recipeId, user, formData);
  };

  return (
    <Card className="m-10">
      <CardHeader>
        <CardTitle>Leave a comment</CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent>
          <Textarea rows={6} name="content" />
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CommentBox;
