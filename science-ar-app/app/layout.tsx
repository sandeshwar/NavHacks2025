import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Science AR Explorer",
  description: "Interactive augmented reality science education platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
