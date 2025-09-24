"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Bell, Home, Briefcase, BarChart2, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {NavItem} from "@/components/NavItem";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { Job } from "../app/utility";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [jobs] = useLocalStorage<Job[]>("jobs", []);

  const today = new Date().toISOString().split("T")[0];
  const notificationCount = jobs?.filter((job) => job.date === today).length ?? 0;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col h-screen">
        <header className="flex items-center justify-between px-6 py-3 bg-background border-b shadow-sm">

  <Link href="/" className="font-extrabold text-2xl text-primary">
    Jobify
  </Link>


  <nav className="hidden md:flex gap-6">
    <NavItem href="/" icon={<Home className="w-5 h-5" />} label="Home" />
    <NavItem href="/jobs" icon={<Briefcase className="w-5 h-5" />} label="Jobs" />
    <NavItem href="/stats" icon={<BarChart2 className="w-5 h-5" />} label="Stats" />
    <NavItem href="/cv" icon={<FileText className="w-5 h-5" />} label="CV" />
  </nav>


  <div className="flex items-center gap-4">
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="w-5 h-5" />
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
        {notificationCount}
      </span>
    </Button>
  </div>
</header>


          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
