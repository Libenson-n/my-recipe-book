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
import { useRef } from "react";

type CommentBoxProps = {
  recipeId: string;
  user: { id: string; userName: string };
};

const CommentBox = ({ recipeId, user }: CommentBoxProps) => {
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: FormData) => {
    addComment(recipeId, user, formData);
    ref.current?.reset();
  };

  return (
    <Card className="m-10">
      <CardHeader>
        <CardTitle>Leave a comment</CardTitle>
      </CardHeader>
      <form ref={ref} action={handleSubmit}>
        <CardContent>
          <Textarea rows={6} name="content" />
        </CardContent>
        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CommentBox;
