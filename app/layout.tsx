import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhoneScope — Smartphone Usage Study 2026",
  description: "A data-driven investigation into smartphone behavior among university students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
