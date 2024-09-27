import { Comment } from "@/lib/types";
import { getComments } from "@/server/actions/comment-controller";
import React from "react";

type CommentSectionProps = {
  recipeId: string;
};

const CommentSection = async ({ recipeId }: CommentSectionProps) => {
  const comments = await getComments(recipeId);

  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <div className="p-10">
      <ul>
        <h3 className="text-xl font-semibold">What do people think</h3>
        {comments.map((comment: Comment) => (
          <li key={comment.id} className="border-b p-4">
            <p>{comment.userName}</p>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
