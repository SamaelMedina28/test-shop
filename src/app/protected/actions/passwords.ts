"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

const passwordSchema = z.object({
    site: z.string().min(1, "Site is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    link: z.string().url("Invalid URL").optional(),
    comments: z.string().optional(),
});

export type CreatePasswordState = {
    success: boolean;
    message?: string;
    errors?: Record<string, string[] | undefined>;
};


export const createPassword = async (prevData: CreatePasswordState, data: FormData) => {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    // Validate the data using zod
    const parsedData = passwordSchema.safeParse({
        site: data.get("site"),
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
        link: data.get("link"),
        comments: data.get("comments"),
    });

    if (!parsedData.success) {
        return {
            data: parsedData.data,
            success: false,
            errors: parsedData.error.flatten().fieldErrors,
        };
    }

    const { site, username, email, password, link, comments } =
        parsedData.data;

    const newPassword = await prisma.password.create({
        data: {
            site,
            username,
            email,
            password,
            link: link ?? null,
            comments: comments ?? null,
            userId: session.user.id,
        },
    });

    return {
        success: true,
        id: newPassword.id,
    };
}
