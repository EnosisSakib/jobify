"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 text-sm px-3 py-2 transition-colors
        ${isActive ? "font-bold text-foreground" : "text-muted-foreground hover:text-primary"}
      `}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
