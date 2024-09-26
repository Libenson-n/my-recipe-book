"use server"

import { db } from "../db";


export const addComment = async (recipeId: string, userId: string, formData: FormData) => {
    
    const content = formData.get("content")

    if (!content || content === "") {
        return {error: "Missig required field"}
    }

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