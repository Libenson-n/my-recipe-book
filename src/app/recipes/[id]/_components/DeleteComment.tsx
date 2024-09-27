"use client";

import { Button } from "@/components/ui/button";
import { deleteComment } from "@/server/actions/comment-controller";

type DeleteCommentProps = {
  commentId: string;
  recipeId: string;
};

const DeleteComment = ({ commentId, recipeId }: DeleteCommentProps) => {
  const handleDelete = () => {
    deleteComment(commentId, recipeId);
  };

  return <Button onClick={handleDelete}>Delete</Button>;
};

export default DeleteComment;
