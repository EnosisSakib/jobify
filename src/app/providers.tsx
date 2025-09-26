"use client";

import { AuthProvider, useAuth } from "./context/authContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavItem } from "@/components/navItem";
import {
  Bell,
  Home,
  Briefcase,
  BarChart2,
  FileText,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Job } from "../app/utility";

// 🔹 Header
function Header() {
  const [jobs] = useLocalStorage<Job[]>("jobs", []);
  const today = new Date().toISOString().split("T")[0];
  const notificationCount =
    jobs?.filter((job) => job.date === today).length ?? 0;
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-background border-b shadow-sm">
      <Link href="/" className="font-extrabold text-2xl text-primary">
        Jobify
      </Link>

      {user && (
        <nav className="hidden md:flex gap-6">
          <NavItem href="/" icon={<Home className="w-5 h-5" />} label="Home" />
          <NavItem
            href="/jobs"
            icon={<Briefcase className="w-5 h-5" />}
            label="Jobs"
          />
          <NavItem
            href="/stats"
            icon={<BarChart2 className="w-5 h-5" />}
            label="Stats"
          />
          <NavItem
            href="/cv"
            icon={<FileText className="w-5 h-5" />}
            label="CV"
          />
        </nav>
      )}

      <div className="flex items-center gap-4">
        {user && (
          <>
            <Link href="/calendar" className="text-primary hover:underline">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

// 🔹 AuthGuard
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      !loading &&
      !user &&
      pathname !== "/login" &&
      pathname !== "/register"
    ) {
      router.push("/login");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user && pathname !== "/login" && pathname !== "/register") {
    return null;
  }

  return <>{children}</>;
}

// 🔹 Provider Wrapper
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}
