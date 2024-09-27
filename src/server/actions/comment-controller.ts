"use server"

import { Comment } from "@/lib/types";
import { db } from "../db";


export const addComment = async (recipeId: string, user: {id: string, userName: string}, formData: FormData) => {
    
    const contentValue = formData.get("content")

    if (!contentValue || contentValue === "") {
        return {error: "Missig required field"}
    }

    const content: string = contentValue.toString()

    try {
        const newComment = await db.comment.create({
            data: {
              content,
              userId: user.id,
              userName: user.userName,
              recipeId  
            }
        })
        return {data: newComment}
    } catch (error) {
        return {error: "Failed to add comment!"}
    }
}

export const getComments = async (recipeId: string) => {
    try {
        const comments = await db.comment.findMany({
            where: {
                recipeId: recipeId
            }
        })
        
        return comments
    } catch (error) {
        console.log("Failed to get comments!", error)
    }
}