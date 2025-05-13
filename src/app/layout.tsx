import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header/Header";

export const metadata: Metadata = {
  title: "My movies app",
  description: "Movies app for React course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}>
          <Header />
        {children}
      </body>
    </html>
  );
}
