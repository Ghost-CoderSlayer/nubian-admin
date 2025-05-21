import type { Metadata } from "next";
import { Lato, Montserrat } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: "900"
});

const montserrat = Montserrat({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NUBIAN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} ${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}







