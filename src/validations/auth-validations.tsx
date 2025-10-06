import * as Yup from "yup";

export const SignInSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
}).required();

export const SignUpSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match!"),
}).required();
