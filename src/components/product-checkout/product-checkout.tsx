"use client";
import { useState, useEffect } from "react";
import Image from "next/legacy/image";

// components
import { Button } from "@/components/ui/button";
import CommonStepper from "@/components/common/common-stepper";
import { ProductDetails } from "@/components/product/product-card";

// utils
import { formatNumber } from "@/lib/utils";

interface CheckoutProps {
  productDetails: ProductDetails;
  qty: number;
  onChangeItemCount: (count: number) => void;
  onDeleteItem: () => void;
}

const ProductCheckout: React.FC<CheckoutProps> = ({
  productDetails,
  qty,
  onDeleteItem,
  onChangeItemCount,
}: CheckoutProps) => {
  const [itemCount, setItemCount] = useState(qty || 1);

  useEffect(() => {
    setItemCount(qty || 1);
  }, [qty]);

  return (
    <>
      <div className="w-full">
        <div className="flex gap-6 items-center">
          <div className="p-1 border rounded-lg">
            <div className="w-[80px] h-[80px] relative">
              <Image
                src={productDetails.img}
                layout="fill"
                alt=""
                objectFit="contain"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2">
            <div>{productDetails.name}</div>
            <div className="font-semibold text-leaf">
              Rp {formatNumber(productDetails.price)}
            </div>
          </div>
          <CommonStepper
            count={itemCount}
            onChange={(count) => {
              setItemCount(count);
              onChangeItemCount(count);
            }}
          />
          <Button
            className="text-red-400 border-0 bg-white font-regular hover:bg-red-50"
            onClick={() => onDeleteItem()}
          >
            Hapus
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductCheckout;
