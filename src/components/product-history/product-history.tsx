"use client";
import { useState } from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

// components
import { Button } from "@/components/ui/button";

// utils
import { cn, formatNumber } from "@/lib/utils";
import { hover } from "@/lib/hover";
import { Product } from "@prisma/client";
import { TransactionWithCheckout } from "@/services/transaction";

interface ProductHistoryProps {
  transaction: TransactionWithCheckout
}

const ProductHistory: React.FC<ProductHistoryProps> = ({
  transaction,
}: ProductHistoryProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const checkoutItems = transaction?.Checkout || [];
  const firstItem = checkoutItems[0];
  const remainingItems = checkoutItems.slice(1);
  const hasMoreItems = remainingItems.length > 0;

  return (
    <>
      <div className="w-full">
        <div className="mt-6">
          <div className="border rounded-xl p-4 flex flex-col gap-4">
            {/* Header with date and status */}
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="text-sm text-gray-500">{new Date(transaction?.createdAt).toDateString()}</div>
                <div className="rounded-sm px-2 py-0.5 bg-leaf text-white text-xs font-semibold">
                  Berhasil
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-medium text-sm">Total Belanja</div>
                <div className="font-semibold">Rp {formatNumber(transaction?.grandTotalPrice || 0)}</div>
              </div>
            </div>

            {/* First product (always visible) */}
            {firstItem && (
              <div className="flex gap-4 items-center">
                <div className="p-1 border rounded-lg overflow-hidden">
                  <div className="w-[60px] h-[60px] relative">
                    <Image
                      src={firstItem?.product?.img}
                      layout="fill"
                      alt={firstItem?.product?.name || ""}
                      objectFit="contain"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <div className="text-base font-semibold text-text-black">
                    {firstItem?.product?.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {firstItem?.qty} kg x Rp {formatNumber(firstItem?.product?.price || 0)}
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  Rp {formatNumber((firstItem?.qty || 1) * (firstItem?.product?.price || 0))}
                </div>
              </div>
            )}

            {/* Expandable products list */}
            {hasMoreItems && (
              <>
                <div
                  className={cn(
                    "flex flex-col gap-3 overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  {remainingItems.map((item, index) => (
                    <div key={`checkout-item-${index}`} className="flex gap-4 items-center">
                      <div className="p-1 border rounded-lg overflow-hidden">
                        <div className="w-[60px] h-[60px] relative">
                          <Image
                            src={item?.product?.img}
                            layout="fill"
                            alt={item?.product?.name || ""}
                            objectFit="contain"
                          />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-0.5">
                        <div className="text-base font-semibold text-text-black">
                          {item?.product?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item?.qty} kg x Rp {formatNumber(item?.product?.price || 0)}
                        </div>
                      </div>
                      <div className="text-sm font-semibold">
                        Rp {formatNumber((item?.qty || 1) * (item?.product?.price || 0))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expand/Collapse button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-center gap-2 text-leaf text-sm font-medium hover:underline transition-all duration-200"
                >
                  <span>{isExpanded ? "Sembunyikan" : `Lihat ${remainingItems.length} item lainnya`}</span>
                  <svg
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isExpanded ? "rotate-180" : ""
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="var(--leaf)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Footer with button */}
            <div className="flex justify-end pt-2 border-t">
              <Button
                className={cn("px-6 bg-leaf", hover.shadow)}
                onClick={() => {
                  router.push("/product");
                }}
              >
                Beli lagi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductHistory;

