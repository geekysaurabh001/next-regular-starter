import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Container from "@/components/layouts/Container";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "NextJS Regular Starter",
  description:
    "A simple regular starter with cleaned up home page + json-db-server setup for quick DB Mocking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} flex h-screen flex-col`}>
        <Header />
        <main className="flex-1">
          <Container>{children}</Container>
        </main>
        <Footer />
      </body>
    </html>
  );
}
