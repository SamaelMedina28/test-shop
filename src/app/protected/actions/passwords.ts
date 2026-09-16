"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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
    id?: string;
    message?: string;
    errors?: Record<string, string[] | undefined>;
};


export const createPassword = async (
    prevData: CreatePasswordState,
    formData: FormData,
): Promise<CreatePasswordState> => {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    const data = {
        site: formData.get("site")?.toString() ?? "",
        username: formData.get("username")?.toString() ?? "",
        email: formData.get("email")?.toString() ?? "",
        password: formData.get("password")?.toString() ?? "",
        link: formData.get("link")?.toString() ?? "",
        comments: formData.get("comments")?.toString() ?? "",
    };

    const parsedData = passwordSchema.safeParse(data);

    if (!parsedData.success) {
        return {
            success: false,
            errors: parsedData.error.flatten().fieldErrors,
        };
    }

    const { site, username, email, password, link, comments } = parsedData.data;

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

    revalidatePath("/protected/");

    return {
        success: true,
        id: newPassword.id,
    };
};
