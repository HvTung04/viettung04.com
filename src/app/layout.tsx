import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Engineer Portfolio | Intelligent Systems",
  description: "Senior AI Engineer specializing in production-ready machine learning, neural architectures, and scalable data pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive" src="/theme-init.js" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-full flex flex-col font-display transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
