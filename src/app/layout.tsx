import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/_lib/NextAuthProvider";
const inter = Inter({ subsets: ["latin"] });

import { NavigationProvider } from '@/contexts/UserContext';
import Header from "@/components/layouts/header/header";
import Footer from "@/components/layouts/footer/footer";

export const metadata: Metadata = {
    title: "ProgrammerRoadmap",
    description: "プログラミング学習者の為のロードマップ。ロードマップ作成ツール",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <NextAuthProvider>
                <body className={inter.className}><NavigationProvider>
                    <Header webTitle="ProgrammerRoadmap" />
                    {children}
                    <Footer />
                </NavigationProvider></body>
            </NextAuthProvider>
        </html>
    );
}