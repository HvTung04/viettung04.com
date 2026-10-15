import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viettung04.com"),
  title: {
    default: "Hoang Viet Tung — AI Engineer | Production Machine Learning",
    template: "%s | Hoang Viet Tung — AI Engineer",
  },
  description:
    "Hoang Viet Tung is a senior AI engineer building production-ready machine learning systems, LLM applications, computer vision, and scalable data pipelines.",
  authors: [{ name: "Hoang Viet Tung", url: "https://viettung04.com" }],
  creator: "Hoang Viet Tung",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  const isDark = theme === "dark";

  return (
    <html
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} antialiased${isDark ? " dark" : ""}`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-canvas text-ink min-h-full flex flex-col font-mono">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
