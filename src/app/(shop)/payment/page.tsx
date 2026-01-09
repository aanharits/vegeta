"use client";

import Image from "next/legacy/image";
import Link from "next/link";

// components
import { Button } from "@/components/ui/button";
import { IconCart } from "@/components/icons";

// utils
import { cn, formatNumber } from "@/lib/utils";
import { hover } from "@/lib/hover";
import { useHistoryQuery } from "@/services/transaction";

export default function Payment() {
  const { data } = useHistoryQuery({ page: "1" });

  // Get the latest transaction's grand total price
  const latestTransaction = data?.data?.data?.[0];
  const nominalTransfer = latestTransaction?.grandTotalPrice || 0;

  return (
    <main className="flex flex-col w-full items-center pb-16 pt-5">
      <div className="w-content flex flex-col items-center">
        <div className="w-[776px] flex flex-col items-center">

          <div className="p-14 border rounded-xl w-[100%] flex flex-col gap-6">
            {/* QRIS Image */}
            <div className="flex flex-col items-center gap-4">
              <div className="text-lg font-semibold">Scan QRIS untuk Pembayaran</div>
              <div className="w-[500px] h-[500px] relative">
                <Image
                  src="/Qris.jpeg"
                  layout="fill"
                  alt="QRIS Payment"
                  objectFit="contain"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div>Nominal Transfer</div>
              <div className="p-6 bg-gray-100 rounded-lg text-lg text-medium flex justify-between items-center">
                Rp {formatNumber(nominalTransfer)}
              </div>
            </div>

            <div className="w-[100%] flex flex-col items-center">
              <Link className="w-[100%]" href={"/product"}>
                <Button className={cn("w-[100%] h-12 bg-leaf", hover.shadow)}>
                  <IconCart className="w-6 h-6" />
                  <div className="ml-4 text-base">Lanjut berbelanja</div>
                </Button>
              </Link>

              <Link className="w-[100%] mt-2" href={"/history"}>
                <Button className={cn("w-[100%] h-12 bg-carrot", hover.shadow)}>
                  <div className="ml-4 text-base">Lihat Riwayat Belanja</div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

