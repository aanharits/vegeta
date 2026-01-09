"use client";

import { useState, useMemo } from "react";

// components
import { Button } from "@/components/ui/button";
import DeliveryOptions from "@/components/product-checkout/delivery-options";
import ItemList from "./ItemList";
import { CheckoutItemSkeleton, CheckoutSummarySkeleton } from "@/components/skeleton";

// utils
import { cn, formatNumber } from "@/lib/utils";
import { hover } from "@/lib/hover";
import {
  useCheckoutsQuery,
  usePaymentMutation,
  useUpdateCheckoutMutation,
  useDeleteCheckoutMutation
} from "@/services/transaction";
import { DeliveryMethod } from '@/types/delivery-method'
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


export default function Checkout() {
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("HOME_DELIVERY");
  const { toast } = useToast()
  const router = useRouter()
  const { data, isLoading } = useCheckoutsQuery();
  const products = data?.data || []
  const [mutatePayment] = usePaymentMutation();
  const [updateCheckout] = useUpdateCheckoutMutation();
  const [deleteCheckout] = useDeleteCheckoutMutation();

  // Calculate totals for all products
  const { totalPrice, totalItem } = useMemo(() => {
    return products.reduce(
      (acc, product) => {
        return {
          totalPrice: acc.totalPrice + product.pricePerItem * (product.qty || 1),
          totalItem: acc.totalItem + (product.qty || 1),
        };
      },
      { totalPrice: 0, totalItem: 0 }
    );
  }, [products]);

  const applicationFee = 1000;
  const deliveryFee = deliveryMethod === "HOME_DELIVERY" ? 5000 : 0;
  const insurance = deliveryMethod === "HOME_DELIVERY" ? 2000 : 0;

  const subtotal = totalPrice + deliveryFee + insurance + applicationFee;

  // Handle quantity change
  const handleChangeItemCount = async (id: string, count: number) => {
    try {
      await updateCheckout({ checkout_id: id, qty: count });
    } catch (error) {
      toast({
        title: "Gagal mengubah jumlah",
        description: "Terjadi kesalahan saat mengubah jumlah item",
        variant: "error",
        duration: 2000,
      });
    }
  };

  // Handle delete item
  const handleDeleteItem = async (id: string) => {
    try {
      await deleteCheckout({ checkout_id: id });
      toast({
        title: "Item dihapus",
        description: "Item berhasil dihapus dari keranjang",
        variant: "error",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Gagal menghapus",
        description: "Terjadi kesalahan saat menghapus item",
        variant: "error",
        duration: 2000,
      });
    }
  };

  const handlePayment = async () => {
    if (products.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Tambahkan item ke keranjang untuk melanjutkan pembayaran",
        variant: "error",
        duration: 2000,
      });
      return;
    }

    try {
      const data = {
        application_fee: applicationFee,
        asurance_fee: insurance,
        delivery_fee: deliveryFee,
        delivery_type: deliveryMethod
      }
      await mutatePayment(data)
      toast({
        title: "Silahkan lakukan pembayaran!",
        variant: "success",
        duration: 2000,
      })
      router.push("/payment")
    } catch (error) {
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal membuat transaksi",
        variant: "error",
        duration: 2000,
      })
    }
  }

  return (
    <>
      <main className="flex flex-col w-full items-center pb-16 pt-5">
        <div className="w-content flex gap-8">
          <div className="flex-[2] flex flex-col gap-8">
            {isLoading ? (
              <>
                <div className="text-lg font-semibold">Barang yang dibeli</div>
                <CheckoutItemSkeleton count={3} />
              </>
            ) : (
              <div className="animate-fadeIn">
                <ItemList
                  products={products}
                  onChangeItemCount={handleChangeItemCount}
                  onDeleteItem={handleDeleteItem}
                />
              </div>
            )}

            <div className="separator" />

            <DeliveryOptions value={deliveryMethod} onChange={setDeliveryMethod} />
          </div>

          <div className="flex-1 h-auto">
            {isLoading ? (
              <>
                <CheckoutSummarySkeleton />
                <div className="flex flex-1">
                  <div className="w-[100%] mt-6">
                    <div className="h-10 w-full rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
                  </div>
                </div>
              </>
            ) : (
              <div className="animate-fadeIn">
                <div className="flex flex-col gap-3 border p-3 rounded-xl">
                  <div className="text-lg font-semibold">Ringkasan Belanja</div>
                  <div className="font-semibold">Total Belanja</div>
                  <div className="flex justify-between">
                    <div>Total Harga ({totalItem} barang)</div>
                    <div>Rp {formatNumber(totalPrice)}</div>
                  </div>

                  {deliveryMethod === "HOME_DELIVERY" && (
                    <>
                      <div className="flex justify-between">
                        <div>Total Ongkos Kirim</div>
                        <div>Rp {formatNumber(deliveryFee)}</div>
                      </div>
                      <div className="flex justify-between">
                        <div>Asuransi Pengiriman</div>
                        <div>Rp {formatNumber(insurance)}</div>
                      </div>
                    </>
                  )}

                  <div className="w-full separator" />
                  <div className="font-semibold">Biaya Transaksi</div>
                  <div className="flex justify-between">
                    <div>Biaya Jasa Aplikasi</div>
                    <div>Rp {formatNumber(applicationFee)}</div>
                  </div>

                  <div className="w-full separator" />
                  <div className="flex justify-between">
                    <div className="text-lg font-semibold">Total Tagihan</div>
                    <div className="text-lg font-semibold">
                      Rp {formatNumber(subtotal)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1">
                  <Button
                    className={cn("w-[100%] mt-6 bg-leaf", hover.shadow)}
                    onClick={handlePayment}
                    disabled={products.length === 0}
                  >
                    Lanjutkan Pembayaran
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
