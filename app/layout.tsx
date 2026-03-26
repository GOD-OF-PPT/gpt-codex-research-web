import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "GPT Codex Team 采购席位调研报告",
  description: "45人开发团队 GPT Codex Team 采购方案调研，含模型对比、限额分析、成本估算",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${jakarta.variable}`}>
      <body className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-[family-name:var(--font-jakarta)] antialiased">
        {children}
      </body>
    </html>
  );
}
