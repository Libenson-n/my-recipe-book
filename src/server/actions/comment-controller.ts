"use server"

import { db } from "../db";


export const addComment = async (recipeId: string, userId: string, formData: FormData) => {
    
    const contentValue = formData.get("content")

    if (!contentValue || contentValue === "") {
        return {error: "Missig required field"}
    }

    const content: string = contentValue.toString()

    try {
        const newComment = await db.comment.create({
            data: {
              content,
              userId,
              recipeId  
            }
        })
        return {data: newComment}
    } catch (error) {
        return {error: "Failed to add comment!"}
    }
    

}