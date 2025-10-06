export type RegisterForm = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string | undefined;
}

export type LoginForm = {
    email: string;
    password: string;
}