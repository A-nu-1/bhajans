import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/navbar-wrapper";
import { Providers } from "@/components/theme-provider";
import AuthProvider from "@/components/session-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSK_Bhajans",
   description: "Bhajan Collection",
  icons: {
    icon: "/aaalogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Providers>
            <NavbarWrapper />
            <main className="min-h-screen bg-linear-to-r from-(--bg1) to-(--bg2)"
            >{children}</main>

          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
