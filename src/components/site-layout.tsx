import { Link } from "@tanstack/react-router";
import { Stethoscope, Github, Mail, Shield } from "lucide-react";
import type { ReactNode } from "react";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 animate-fade-in">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const linkBase =
    "relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";
  const activeCls = { className: `${linkBase} !text-foreground bg-muted` };
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-card)] transition-transform group-hover:scale-105">
            <Stethoscope className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            MedAce<span className="text-primary"> AI</span>
          </span>
        </Link>
        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link to="/" className={linkBase} activeOptions={{ exact: true }} activeProps={activeCls}>
            Home
          </Link>
          <Link to="/dashboard" className={linkBase} activeProps={activeCls}>
            Dashboard
          </Link>
          <Link to="/assistant" className={linkBase} activeProps={activeCls}>
            <span className="hidden sm:inline">AI </span>Assistant
          </Link>
          <Link to="/about" className={linkBase} activeProps={activeCls}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-gradient-to-b from-muted/20 to-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-card)]">
              <Stethoscope className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              MedAce<span className="text-primary"> AI</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            AI-Powered MBBS Exam Companion
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Built to help medical students prepare smarter for professional examinations.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
            <li><Link to="/assistant" className="hover:text-foreground">AI Assistant</Link></li>
            <li><Link to="/exam-mode" className="hover:text-foreground">Exam Mode</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" />Privacy Policy</Link></li>
            <li><Link to="/contact" className="hover:text-foreground inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>MedAce AI © 2026 · Created for MBBS students using AI.</p>
          <p className="inline-flex items-center gap-1.5">
            <Github className="h-3.5 w-3.5" /> Made with care for future doctors
          </p>
        </div>
      </div>
    </footer>
  );
}
