import { Link } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";
import type { ReactNode } from "react";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const linkBase =
    "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";
  const activeCls = { className: `${linkBase} !text-foreground` };
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-brand)] text-white shadow-[var(--shadow-card)]">
            <Stethoscope className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            MedAce<span className="text-primary"> AI</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link to="/" className={linkBase} activeOptions={{ exact: true }} activeProps={activeCls}>
            <span className="px-3 py-2">Home</span>
          </Link>
          <Link to="/assistant" className={linkBase} activeProps={activeCls}>
            <span className="px-3 py-2">AI Assistant</span>
          </Link>
          <Link to="/about" className={linkBase} activeProps={activeCls}>
            <span className="px-3 py-2">About</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>Created for MBBS students using AI.</p>
        <p className="text-xs">© {new Date().getFullYear()} MedAce AI</p>
      </div>
    </footer>
  );
}
