import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NiceModalProvider from "@/providers/NiceModalProvider";
import GlobalHeader from "@/components/Header";
import ThemeProvider from "@/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI工具箱",
  description: "AI工具箱",
};
/**
 * 默认布局
 * @param param0
 * @returns
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NiceModalProvider>
            <GlobalHeader />
            {children}
          </NiceModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
