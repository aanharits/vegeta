"use client";
import { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductHistory from "@/components/product-history/product-history";
import CommonPagination from "@/components/common/common-pagination";
import { ProductHistorySkeleton, UserProfileSkeleton } from "@/components/skeleton";

// utils
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";

// assets
import GoldBadge from "@/assets/images/badge-gold.png";
import { useSession } from "next-auth/react";
import { useHistoryQuery } from "@/services/transaction";

export default function History() {
  const { data: session, status: sessionStatus } = useSession();
  const [activePage, setActivePage] = useState(1);
  const { data: transactions, isLoading: isLoadingTransactions } = useHistoryQuery({ page: String(activePage) });
  const totalPage = transactions?.data?.total ? Math.ceil(transactions.data.total / 4) : 1;

  const isLoadingProfile = sessionStatus === "loading";

  return (
    <main className="flex flex-col w-full min-h-screen items-center pb-8">
      <div className="w-content flex gap-6">
        {/* {isLoadingProfile ? (
          <UserProfileSkeleton />
        ) : (
          <div className="m-5 p-5 flex flex-col flex-[1] border rounded-xl items-center gap-2 animate-fadeIn">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-[71px] h-[71px] rounded-[20px] relative overflow-hidden">
                <Image
                  src={`https://ui-avatars.com/api/?name=${session?.user.name}&background=random`}
                  layout="fill"
                  alt=""
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="font-semibold">{session?.user.name}</div>
            <div className="flex items-center justify-center">
              <div className="w-[14px] h-[20px] relative mr-2">
                <Image src={GoldBadge} layout="fill" alt="" objectFit="cover" />
              </div>
              <span>Member Gold</span>
            </div>
            <div className="w-[100%] separator mt-3" />
            <div className="w-[100%] gap-3 flex flex-col">
              <div className="mt-6">
                <div>Transaksi bulan ini</div>
                <div className="text-[20px] font-bold">120 x</div>
              </div>
              <div className="">
                <div>Belanja bulan ini</div>
                <div className="text-[20px] font-bold text-leaf">
                  Rp 1.300.000
                </div>
              </div>
              <div className="mt-3">
                <div>Saldo saat ini</div>
                <div className="text-[20px] font-bold text-carrot">
                  Rp 300.000
                </div>
              </div>
            </div>
            <div className="w-[100%] separator mt-6 mb-3" />
          </div>
        )} */}
        <div className="m-5 flex-[3]">
          <div className="flex justify-between">
            <div className="text-leaf text-3xl font-semibold">
              Riwayat Belanja
            </div>
            <div className="flex items-center gap-2">
              <div>Urut Berdasarkan</div>
              <Select defaultValue={"transaksi-terbaru"}>
                <SelectTrigger
                  className={cn("w-[234px] bg-white", hover.shadow)}
                >
                  <SelectValue placeholder="Urut Berdasarkan" />
                </SelectTrigger>
                <SelectContent className="w-[234px]">
                  <SelectGroup>
                    <SelectItem value="transaksi-terbaru">
                      Transaksi terbaru
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoadingTransactions ? (
            <ProductHistorySkeleton count={3} />
          ) : (
            <div className="animate-fadeIn">
              {transactions?.data.data.map((transaction, index) => (
                <ProductHistory
                  key={`productHistory${index}`}
                  transaction={transaction}
                />
              ))}
            </div>
          )}

          <div className="pt-4">
            <CommonPagination
              page={activePage}
              total={totalPage}
              onChange={(activePage) => setActivePage(activePage)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

