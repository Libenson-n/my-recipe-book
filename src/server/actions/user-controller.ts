"use server"

import { User } from "@/lib/types";
import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";

export const getUserIdWithClerkId = async () => {
    const clerkUser = await currentUser()
    const clerkUserId = clerkUser?.id

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: clerkUserId 
            }
        })
        
        return user
    } catch (error) {
        console.log(error)
        
    }
}