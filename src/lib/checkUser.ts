import { currentUser } from "@clerk/nextjs/server";
import {db} from "@/server/db"

export const checkUser = async () => {
    const user = await currentUser()

    if (!user) {
        return null
    }


    const loggedInUser = await db.user.findUnique({
        where: {
            clerkUserId: user.id
        }
    })

    if (loggedInUser) {
        return loggedInUser
    }

    const newUser = await db.user.create({
        data: {
            clerkUserId: user.id,
            userName: user?.username as string,
            email: user.emailAddresses[0]?.emailAddress as string,
            imageUrl: user.imageUrl,
        }
    })

    return newUser
}