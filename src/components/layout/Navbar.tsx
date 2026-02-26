"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Menu, X, Search, Ticket } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Explore" },
  { href: "/deals", label: "Best Deals" },
  { href: "/trends", label: "Trends" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-heading">
            <Ticket className="h-6 w-6 text-primary" />
            <span>TicketPool</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-body hover:text-heading transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Search hint */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/?focus=search"
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:border-gray-400 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Search matches...</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-body hover:text-heading"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-body hover:text-heading px-2 py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </nav>
  );
}
