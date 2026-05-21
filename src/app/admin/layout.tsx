import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../../app/globals.css";
import AdminSidebar from "@/components/admin/AdminSidebar";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Admin | Architect Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${jetbrainsMono.variable} dark bg-surface-dark text-canvas font-mono antialiased min-h-screen`}>
      <AdminSidebar />
      <header className="fixed top-0 right-0 left-72 h-16 z-40 bg-surface-dark/80 backdrop-blur-md flex items-center justify-between px-8 border-b border-hairline">
        <div className="flex items-center gap-8">
          <span className="text-sm font-bold text-on-dark">[+] ARCHITECT DASHBOARD</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted text-sm">[~]</span>
            <input className="bg-surface-dark-elevated border border-hairline rounded-sm pl-10 pr-4 py-1.5 text-xs font-mono text-on-dark focus:border-on-dark focus:outline-none placeholder:text-on-dark-muted" placeholder="QUERY DATABASE..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-on-dark-muted hover:text-on-dark transition-colors font-mono text-xs">[notifications]</button>
          <button className="text-on-dark-muted hover:text-on-dark transition-colors font-mono text-xs">[terminal]</button>
          <button className="text-on-dark-muted hover:text-on-dark transition-colors font-mono text-xs">[account]</button>
        </div>
      </header>
      <div className="ml-72 pt-16">
        {children}
      </div>
    </div>
  );
}