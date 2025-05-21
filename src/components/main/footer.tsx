"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";


export default function Footer({ children }: { children: ReactNode }) {
  const router = useRouter();

return (
    <>
        <main>{children}</main>

        <footer className="border-t border-yellow-500 bg-background px-6 md:px-10 py-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-sm text-muted-foreground">
                <button 
                    onClick={() => router.push('/')}
                    className="hover:text-yellow-600 cursor-pointer"
                >
                    © 2025 NUBIAN. All rights reserved.
                </button>
            </div>
            <div className="flex gap-6 text-sm">
                <button 
                    onClick={() => router.push('/privacy')}
                    className="hover:text-primary cursor-pointer"
                >
                    Privacy Policy
                </button>
                <button 
                    onClick={() => router.push('/terms')}
                    className="hover:text-primary cursor-pointer"
                >
                    Terms of Service
                </button>
                <button 
                    onClick={() => router.push('/contact')}
                    className="hover:text-primary cursor-pointer"
                >
                    Contact
                </button>
            </div>
            </div>
        </footer>
    </>
  );
}