"use client";
import Image from "next/legacy/image";
import Link from "next/link";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconCall,
  IconEnvelope,
  IconFacebook,
  IconInstagram,
  IconLocation,
  IconSchedule,
  IconTwitter,
  IconYoutube,
} from "@/components/icons";

// assets
import footerBg from "@/assets/images/footer-bg.jpg";

import LogoPlayStore from "@/assets/images/play-store.png";
import LogoAppStore from "@/assets/images/app-store.png";

// utils
import { cn } from "@/lib/utils";
import { hover } from "@/lib/hover";

interface HeaderProps {}

const CommonFooter: React.FC<HeaderProps> = () => {
  return (
    <>
      <div className="w-extra flex flex-col items-center justify-center">
        <div
          className="flex w-extra py-4 items-center justify-center"
          style={{
            backgroundImage: `url(${footerBg.src})`,
            backgroundSize: "cover",
          }}
        >
          <div className="w-[900px] p-[52px] flex gap-[67px]">
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <div className="text-2xl font-semibold py-2">
                  Dapatkan berita terbaru dari kami
                </div>
                <div className="text-xl text-gray-400 font-light">
                  Mulai berbelanja dengan{" "}
                  <span className="text-leaf font-bold">SayurHub</span>
                </div>
              </div>

              <Input
                className="w-full p-4"
                type="text"
                placeholder="Masukkan alamat email"
              />
              <Input
                className="w-full p-4"
                type="text"
                placeholder="Masukkan nomor telepon"
              />
              <Button className={cn("py-2 px-7 bg-leaf", hover.shadow)}>
                Subscribe
              </Button>
            </div>

            <Image
              src="/footer-illustration.png"
              width={280}
              height={280}
              alt=""
              className="object-cover"
            />
          </div>
        </div>

        <div
          className="flex w-extra py-4 items-center justify-center"
          style={{
            backgroundImage: `url(${footerBg.src})`,
            backgroundSize: "cover",
          }}>
          <div className="w-content py-9">
            <div className="flex">
              <div className="flex flex-col gap-5 grow-[2]">

                <div className="relative w-[166px] h-[45px]">
                  <Image
                    src="/logo-sayurhub.png"
                    layout="fill"
                    objectFit="contain"
                    alt=""
                  />
                </div>

                <div className="flex gap-2">
                  <Link href="/">
                    <IconFacebook className="w-7 h-7" />
                  </Link>
                  <Link href="/">
                    <IconInstagram className="w-7 h-7" />
                  </Link>
                  <Link href="/">
                    <IconYoutube className="w-7 h-7" />
                  </Link>
                  <Link href="/">
                    <IconTwitter className="w-7 h-7" />
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  <Link className="flex gap-2" href="/">
                    <IconCall className="w-6 h-6" /> <span>(0341) 4323332</span>
                  </Link>
                  <Link className="flex gap-2" href="/">
                    <IconEnvelope className="w-6 h-6" />{" "}
                    <span>hi@vegeta.test</span>
                  </Link>
                  <Link className="flex gap-2" href="/">
                    <IconLocation className="w-6 h-6" />{" "}
                    <span>Jl. Rumdon </span>
                  </Link>
                  <Link className="flex gap-2" href="/">
                    <IconSchedule className="w-6 h-6" />{" "}
                    <span>Buka Terus</span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-5 grow">
                <div className="font-bold text-base text-black">Perusahaan</div>
                <div className="flex flex-col gap-3">
                  <Link href="/">Tentang Kami</Link>
                  <Link href="/">Service</Link>
                  <Link href="/">Studi Kasus</Link>
                  <Link href="/">Blog</Link>
                  <Link href="/">Contact</Link>
                </div>
              </div>
              <div className="flex flex-col gap-5 grow">
                <div className="font-bold text-base text-black">Akun</div>
                <div className="flex flex-col gap-3">
                  <Link href="/">Masuk</Link>
                  <Link href="/">Lihat Keranjang</Link>
                  <Link href="/">Favorit Saya</Link>
                  <Link href="/">Pesanan Saya</Link>
                  <Link href="/">Bandingkan Produk</Link>
                </div>
              </div>
              <div className="flex flex-col gap-5 grow-[2] items-center">
                <div className="flex flex-col gap-4">
                  <div className="font-bold text-base text-black">Download</div>
                  <Link href="/">
                    <Image
                      src={LogoPlayStore}
                      width={135}
                      height={40}
                      alt=""
                      className="object-cover"
                    />
                  </Link>
                  <Link href="/">
                    <Image
                      src={LogoAppStore}
                      width={135}
                      height={40}
                      alt=""
                      className="object-cover"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-extra bg-satin pb-8">
          <div className="w-content separator mb-5" />
          <div className="w-content flex justify-between">
            <div className="">
              Copyright © 2026{" "}
              <Link className="text-leaf" href={"/"}>
                SayurHub
              </Link>{" "}
              All Right Reserved
            </div>
            <div className="">
              Made by{" "}
                <span className="text-leaf">@SayurHub</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CommonFooter };
