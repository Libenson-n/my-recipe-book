import { Comment } from "@/lib/types";
import { getComments } from "@/server/actions/comment-controller";
import React from "react";
import DeleteComment from "./DeleteComment";
import { getUserIdWithClerkId } from "@/server/actions/user-controller";

type CommentSectionProps = {
  recipeId: string;
};

const CommentSection = async ({ recipeId }: CommentSectionProps) => {
  const comments = await getComments(recipeId);
  const user = await getUserIdWithClerkId();
  const userId = user?.id;

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
            {userId === comment.userId && (
              <DeleteComment commentId={comment.id} recipeId={recipeId} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
