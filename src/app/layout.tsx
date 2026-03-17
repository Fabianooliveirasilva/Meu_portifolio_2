import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Portfolio | Full Stack & QA Engineer",
  description:
    "Portfolio pessoal de desenvolvedor Full Stack & QA Engineer — projetos modernos, performance e automação de testes.",
  keywords: ["portfolio", "developer", "full stack", "QA", "React", "Next.js"],
  authors: [{ name: "Developer" }],
  openGraph: {
    title: "Dev Portfolio | Full Stack & QA Engineer",
    description: "Projetos modernos, performance e automação de testes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f172a] text-[#e2e8f0]`}
      >
        {children}
      </body>
    </html>
  );
}
