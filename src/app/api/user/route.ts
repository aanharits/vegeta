import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        success: true,
        message: "Get All User Success",
        data: [
            {
                id: 1,
                name: "harits",
            },
            {
                id: 2,
                name: "aan",
            },
        ],
    })
}

export async function POST() {
    return NextResponse.json({
        success: true,
        message: "Create User Success",
        data: {
            id: 1,
            name: "John Doe",
        },
    })
}