import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyStore - E-Commerce",
  description: "MyStore - E-Commerce",
};

export default function RootLayout({
        children,
            }: Readonly<{
              children: React.ReactNode;
            }>) {
        return (
            <html lang="en">
              <body className="flex flex-col min-h-screen">
                <Navbar />
                  <main className="flex-grow">{children}</main>
                <Footer />
              </body>
            </html>
        );
}




