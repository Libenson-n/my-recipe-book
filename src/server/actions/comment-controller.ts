"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";

export const addComment = async (
  recipeId: string,
  user: { id: string; userName: string },
  formData: FormData,
) => {
  const contentValue = formData.get("content");

  if (!contentValue || contentValue === "") {
    return { error: "Missig required field" };
  }

  const content: string = contentValue.toString();

  try {
    const newComment = await db.comment.create({
      data: {
        content,
        userId: user.id,
        userName: user.userName,
        recipeId,
      },
    });
    revalidatePath(`/reciped/${recipeId}`);
    return { data: newComment };
  } catch (error) {
    return { error: "Failed to add comment!" };
  }
};

export const getComments = async (recipeId: string) => {
  try {
    const comments = await db.comment.findMany({
      where: {
        recipeId: recipeId,
      },
    });

    return comments;
  } catch (error) {
    console.log("Failed to get comments!", error);
  }
};

export const getCommentsByUserId = async (userId: string) => {
  try {
    const userComments = await db.comment.findMany({
      where: {
        userId: userId,
      },
    });
    return userComments;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (commentId: string, recipedId: string) => {
  try {
    const res = await db.comment.delete({
      where: {
        id: commentId,
      },
    });

    revalidatePath(`/recipes/${recipedId}`);
    return { message: "Comment successfully deleted!" };
  } catch (error) {
    console.log(error);
  }
};
