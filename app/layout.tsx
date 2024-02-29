import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Know Your Rights!",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a2463]">
      <AuthProvider>
        <Navigation />
        {children}
        </AuthProvider>
        </body>
    </html>
  );
}
