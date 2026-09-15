export type PasswordEntry = {
    id: string;
    site: string;
    username: string;
    email: string;
    password: string;
    link: string | null;
    comments: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};