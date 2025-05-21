"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter()

  return (
    <section className="bg-white px-6 md:px-20 py-12">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        <div className="max-w-4/6 -space-y-0">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            NUBIAN - PLACE WHERE WHAT YOU NEED IS HERE!
          </h1>
          <p className="text-muted-foreground">Browse through our diverse range of meticulously   crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <Button type="button" onClick={() => router.push('/src/app/(screens)/store/shop')} className="rounded-full text-base px-6 py-3 bg-yellow-500 text-white hover:bg-yellow-600 ring-2 ring-yellow-300 transition-transform transform hover:scale-105">
            Shop Now
          </Button>

          <div className="flex gap-8 pt-6">
            <div className="transition-transform transform hover:scale-105 hover:shadow-lg p-2 rounded-md">
              <p className="text-xl font-semibold">200+</p>
              <p className="text-sm text-muted-foreground">Internation Brands</p>
            </div>
            <div className="transition-transform transform hover:scale-105 hover:shadow-lg p-2 rounded-md">
              <p className="text-xl font-semibold">2,000+</p>
              <p className="text-sm text-muted-foreground">High-Quality Products</p>
            </div>
            <div className="transition-transform transform hover:scale-105 hover:shadow-lg p-2 rounded-md">
              <p className="text-xl font-semibold">20,000+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
          </div>
        </div>

        <div className="relative 2-full md:w-[1550px] h-[500px]">
          <Image src="/Add-to-Cart-amico.png"
            alt="Models in style"
            fill
            className="object-contain transition-transform duration-300 ease-in-out hover:scale-105"
            priority />
        </div>
      </div>
    </section>
  );
}

