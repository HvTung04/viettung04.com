import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
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
    template: "%s — Hoang Viet Tung",
  },
  description:
    "Hoang Viet Tung is a senior AI engineer building production-ready machine learning systems, LLM applications, computer vision, and scalable data pipelines.",
  authors: [{ name: "Hoang Viet Tung", url: "https://viettung04.com" }],
  creator: "Hoang Viet Tung",
  publisher: "Hoang Viet Tung",
  applicationName: "Hoang Viet Tung — AI Engineer Portfolio",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  const isDark = theme === "dark";

  // next-intl's middleware tags the request with the resolved locale.
  const headerList = await headers();
  const locale = headerList.get("x-next-intl-locale") || "vi";

  return (
    <html
      lang={locale}
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
