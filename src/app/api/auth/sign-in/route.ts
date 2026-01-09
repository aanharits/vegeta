import Response from "@/lib/api.response"
import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client";
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    try {
        const payload = await req.json();

        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            },
        });

        if (!user || !bcrypt.compareSync(payload.password, user.password)) {
            return Response({
                message: "Incorrect Email or Password",
                status: 401,
            });
        }

        const data: Partial<User> = {
            ...user,
            password: undefined,
        }

        return Response({
            message: "Sign in Succesfully",
            data,
        });
    } catch (error: any) {
        return Response({
            message: "Sign In Failed",
            data: error,
            status: 500,
        });
    }
}