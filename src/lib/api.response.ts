import { NextResponse } from "next/server";

interface IResponse {
    message?: string;
    data?: any;
    status?: ResponseInit['status'];
}

const Response = ({ message = "Succes", data, status = 200 }: IResponse) => NextResponse.json(
    {
        success: true,
        message,
        data,
    },
    {
        status,
    }
);

export default Response;