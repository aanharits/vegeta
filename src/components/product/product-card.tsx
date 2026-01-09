"use client";
import { useState } from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

// components
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IconCart, IconStar } from "@/components/icons";

// utils
import { cn, formatNumber } from "@/lib/utils";
import { Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useCheckoutMutation } from "@/services/transaction";
import { useToast } from "@/components/ui/use-toast";
import bgAuth from "@/assets/images/bg-authentication.jpg";

export interface ProductDetails {
  id: string;
  name: string;
  price: number;
  img: string;
}

interface CardProps {
  details: Product;
  className?: string;
}

const ProductCard: React.FC<CardProps> = ({
  details,
  className,
}: CardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [mutateCheckout] = useCheckoutMutation();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      toast({
        title: "Please Sign in First",
        variant: "destructive",
      });
      router.push("/auth/signin");
      return;
    }

    await mutateCheckout({
      product_id: details.id,
      qty: 1,
    });

    toast({
      title: "Berhasil!",
      description: `${details.name} telah ditambahkan ke keranjang`,
      variant: "success",
      duration: 2000,
    });
  };

  return (
    <>
      <div
        className={cn(
          "w-full flex flex-col gap-2 p-4 border border-gray rounded-xl hover:transition-all hover:ease-in hover:duration-200 hover:drop-shadow-lg bg-white relative",
          className
        )}
        style={{ backgroundImage: `url(${bgAuth.src})`, backgroundSize: "cover" }}
      >
        <div className="w-full relative">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={details.img}
              layout="fill"
              alt=""
              objectFit="contain"
            />
          </AspectRatio>
        </div>
        <div className="text-xl font-bold ">{details.name}</div>
        <div className="font-semibold">
          Rp {formatNumber(details.price)} / kg
        </div>
        <div className="flex gap-2">
          <IconStar className="w-5 h-5" fill="carrot" stroke="carrot" />
          <span>{details.rating}</span>
          <span>|</span>
          <span>{details.itemSold} terjual</span>
        </div>
        <Button
          className="py-1 px-7 bg-leaf hover:transition-all hover:ease-in hover:duration-200 hover:opacity-80 leading-4"
          onClick={handleAddToCart}
        >
          <IconCart className="w-[18px] h-[18px] mr-2" stroke="background" />
          Masukkan Keranjang
        </Button>
      </div>
    </>
  );
};

export { ProductCard };
