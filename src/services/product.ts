import BaseResponse from "@/types/response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Product } from "@prisma/client";

interface ProductResponse extends BaseResponse {
    data: Product;
}

interface ProductsResponse extends BaseResponse {
    data: {
        total: number;
        data: Product[];
    }
}

interface ProductApiParams {
    page?: string | undefined;
    category?: string | undefined;
}

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/product",
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductsResponse, ProductApiParams>({
            query: ({page, category}) => ({
                url: "/",
                params: {
                    page: page || undefined,
                    category: category || undefined,
                }
            }),
        }),
        getProductById: builder.query<ProductResponse, string>({
            query: (id) => ({
                url: `/${id}`,
            })
        })
    }),
})

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi