import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { PasswordEntry } from "@/types/password"

export const getPasswords = async () : Promise<PasswordEntry[]> => {
    const session = await auth();
    if (!session?.user) {
        throw new Error("User not authenticated");
    }
    const userId = session.user.id;
    const passwords = await prisma.password.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            userId: userId,
        },
    })

    return passwords
}