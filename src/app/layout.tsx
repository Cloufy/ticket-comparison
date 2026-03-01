import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicketPool - Compare World Cup 2026 Ticket Prices",
  description:
    "Compare ticket prices across StubHub, SeatGeek, and Viagogo for all FIFA World Cup 2026 matches. Find the best deals and track price trends.",
  other: {
    "fo-verify": "b42dd840-541c-45e6-a583-7812102f6f2f",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
