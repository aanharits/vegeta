"use client";

import React from "react";

// components
import ProductCheckout from "@/components/product-checkout/product-checkout";
import { Product } from "@prisma/client";

interface CheckoutItem {
  id: string;
  userId: string;
  productId: string;
  qty: number;
  pricePerItem: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}

interface ItemListProps {
  products: CheckoutItem[];
  onChangeItemCount: (id: string, count: number) => void;
  onDeleteItem: (id: string) => void;
}

function ItemList({
  products = [],
  onChangeItemCount,
  onDeleteItem,
}: ItemListProps) {
  return (
    <>
      <div className="text-lg font-semibold">Barang yang dibeli</div>

      <div className="flex flex-col gap-4 mt-4">
        {products.map((product) => (
          <ProductCheckout
            key={product.id}
            productDetails={product.product}
            onDeleteItem={() => onDeleteItem(product.id)}
            onChangeItemCount={(count) => onChangeItemCount(product.id, count)}
            qty={product.qty}
          />
        ))}
      </div>
    </>
  );
}

export default ItemList;
