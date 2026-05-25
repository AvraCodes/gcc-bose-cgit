import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bose GCC Proposal",
  description: "Protected access.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
