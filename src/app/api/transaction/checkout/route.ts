import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    const payload = await req.json();

    // Validate product_id exists
    if (!payload.product_id) {
        return Response({
            message: "Product ID is required",
            status: 400
        })
    }

    const product = await prisma.product.findUnique({
        where: {
            id: payload.product_id,
        },
    })

    console.log("Product found:", product?.name);
    console.log("=== END DEBUG ===")

    if (!product) {
        return Response({
            message: "Product Not Found",
            status: 404
        })
    }

    const checkout = await prisma.checkout.create({
        data: {
            productId: product.id,
            userId: session?.user.id,
            qty: payload.qty,
            pricePerItem: product.price,
        },
    })

    return Response({
        message: "Checkout Success",
        data: checkout,
    })
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        const checkouts = await prisma.checkout.findMany({
            where: {
                userId: session?.user.id,
                transactionId: {
                    equals: null,
                },
            },
            include: {
                product: true,
            }
        })

        return Response({
            message: "Get list of checkout",
            data: checkouts,
        })
    } catch (error) {
        return Response({
            message: "Checkout Failed",
            data: error,
            status: 500
        })
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const payload = await req.json();

        if (!payload.checkout_id || !payload.qty) {
            return Response({
                message: "checkout_id and qty are required",
                status: 400
            })
        }

        const checkout = await prisma.checkout.findFirst({
            where: {
                id: payload.checkout_id,
                userId: session?.user.id,
                transactionId: null,
            }
        })

        if (!checkout) {
            return Response({
                message: "Checkout item not found",
                status: 404
            })
        }

        const updatedCheckout = await prisma.checkout.update({
            where: {
                id: payload.checkout_id,
            },
            data: {
                qty: payload.qty,
            },
            include: {
                product: true,
            }
        })

        return Response({
            message: "Checkout updated successfully",
            data: updatedCheckout,
        })
    } catch (error) {
        return Response({
            message: "Failed to update checkout",
            data: error,
            status: 500
        })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const { searchParams } = new URL(req.url)
        const checkoutId = searchParams.get("id")

        if (!checkoutId) {
            return Response({
                message: "checkout id is required",
                status: 400
            })
        }

        const checkout = await prisma.checkout.findFirst({
            where: {
                id: checkoutId,
                userId: session?.user.id,
                transactionId: null,
            }
        })

        if (!checkout) {
            return Response({
                message: "Checkout item not found",
                status: 404
            })
        }

        await prisma.checkout.delete({
            where: {
                id: checkoutId,
            }
        })

        return Response({
            message: "Checkout deleted successfully",
        })
    } catch (error) {
        return Response({
            message: "Failed to delete checkout",
            data: error,
            status: 500
        })
    }
}
