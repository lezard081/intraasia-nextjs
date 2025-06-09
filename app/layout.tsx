import type { Metadata } from "next";
import { robotoCondensed } from "@/app/ui/fonts";
import Nav from "@/app/ui/nav";

import "./globals.css";

export const metadata: Metadata = {
  title: "IntraAsia",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.className} ${robotoCondensed.className} antialiased`}
      >
      <Nav />
        {children}
      </body>
    </html>
  );
}
