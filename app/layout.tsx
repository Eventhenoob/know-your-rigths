import type { Metadata } from "next";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Navigation from "@/components/Navigation";
import AuthProvider from "@/components/AuthProvider";
import ChatBoxContainer from "@/components/ChatBoxContainer/ChatBoxContainer";
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
      <body className="bg-[#f1f5f9]">
      <AuthProvider>
        <Navigation />
          {children}
          <ChatBoxContainer />
        </AuthProvider>
        </body>
    </html>
  );
}
