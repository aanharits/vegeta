import Response from "@/lib/api.response";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

// get by id
export async function GetById(req: NextRequest, params: Params) {
    const id = params.params.id;

    return Response({
        message: `Get detail by user ${id}`,
        data: [
            {
                id,
                name: "Farhan",
            },
        ],
        status: 200,
    })
}

// get all data
export async function GET() {
    return Response({
        message: "Get All User Success",
        data: [
            {
                id: 1,
                name: "John Doe",
            },
            {
                id: 2,
                name: "Jane Doe",
            },
        ],
        status: 200,
    });
} 

export async function POST() {
    return Response({
        message: "Create User Success",
        data: [
            {
                id: 3,
                name: "Aan Doe",
            },
        ]
    });
}