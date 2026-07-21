import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  BookOpen,
  ListChecks,
  MessageSquareQuote,
  Lightbulb,
  CalendarClock,
  FileHeart,
  Layers,
  ArrowRight,
  Target,
  Flame,
  Clock,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import { useMemo } from "react";
import { SiteLayout } from "@/components/site-layout";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · MedAce AI" },
      { name: "description", content: "Your MBBS study dashboard: goals, progress and quick access to AI study tools." },
      { property: "og:title", content: "MedAce AI Dashboard" },
      { property: "og:description", content: "Track progress and jump into AI-powered MBBS study." },
    ],
  }),
  component: Dashboard,
});

const quickAccess = [
  { icon: BookOpen, label: "Summary", mode: "summary" },
  { icon: ListChecks, label: "MCQs", mode: "mcq" },
  { icon: MessageSquareQuote, label: "Viva", mode: "viva" },
  { icon: Lightbulb, label: "Simplify", mode: "simplify" },
  { icon: FileHeart, label: "Clinical", mode: "clinical" },
  { icon: Layers, label: "Flashcards", mode: "flashcards" },
  { icon: Sparkles, label: "Mnemonics", mode: "mnemonics" },
  { icon: CalendarClock, label: "Revision", mode: "revision" },
];

function greetingFor(hour: number) {
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function Dashboard() {
  const { session, hydrated } = useSession();
  const greeting = useMemo(() => greetingFor(new Date().getHours()), []);

  const doneToday = Math.min(session.recentTopics.filter((r) => Date.now() - r.ts < 24 * 3600 * 1000).length, 5);
  const goal = 5;
  const progress = Math.round((doneToday / goal) * 100);
  const streak = session.recentTopics.length > 0 ? Math.min(session.recentTopics.length, 12) : 0;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        {/* Greeting */}
        <div className="flex flex-wrap items-end justify-between gap-4 animate-fade-in-up">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Dashboard
            </span>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              {greeting}, Student <span className="align-middle">👋</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              {hydrated && session.year
                ? `Ready for another ${session.subject || "MBBS"} session?`
                : "Pick your exam mode and let's get studying."}
            </p>
          </div>
          <Link
            to="/exam-mode"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5"
          >
            {hydrated && session.year ? "Continue Studying" : "Set Exam Mode"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Top cards */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {/* Daily goal */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary"><Target className="h-4 w-4" /></span>
                <h3 className="font-semibold">Daily Study Goal</h3>
              </div>
              <span className="text-xs text-muted-foreground">{doneToday}/{goal} topics</span>
            </div>
            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-success transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {doneToday >= goal
                ? "Goal complete! Keep the momentum going."
                : `${goal - doneToday} more topics to hit today's goal.`}
            </p>
          </div>

          {/* Progress */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] animate-fade-in-up" style={{ animationDelay: "80ms" }}>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-success/10 text-success"><TrendingUp className="h-4 w-4" /></span>
              <h3 className="font-semibold">Study Progress</h3>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <Stat label="Sessions" value={session.recentTopics.length} />
              <Stat label="Streak" value={streak} suffix="d" />
              <Stat label="Today" value={doneToday} />
            </div>
          </div>

          {/* Exam mode chip */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-success/5 p-6 shadow-[var(--shadow-card)] animate-fade-in-up" style={{ animationDelay: "160ms" }}>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-primary shadow"><GraduationCap className="h-4 w-4" /></span>
              <h3 className="font-semibold">Exam Mode</h3>
            </div>
            {hydrated && session.year ? (
              <div className="mt-4 space-y-2 text-sm">
                <p><span className="text-muted-foreground">Year:</span> <span className="font-medium">{session.year}</span></p>
                <p><span className="text-muted-foreground">Subject:</span> <span className="font-medium">{session.subject}</span></p>
                <Link to="/exam-mode" className="mt-2 inline-flex text-sm font-semibold text-primary hover:underline">Change →</Link>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">No mode set yet.</p>
                <Link to="/exam-mode" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Set your MBBS year & subject <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick access */}
        <div className="mt-10 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Quick Access</h2>
            <Link to="/assistant" className="text-sm font-medium text-primary hover:underline">Open AI Assistant →</Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickAccess.map((q) => (
              <Link
                key={q.mode}
                to="/assistant"
                search={{ mode: q.mode } as never}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-success/10 text-primary transition-transform group-hover:scale-110">
                  <q.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">{q.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent + Continue */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary"><Clock className="h-4 w-4" /></span>
              <h3 className="font-semibold">Recently Studied Topics</h3>
            </div>
            {hydrated && session.recentTopics.length > 0 ? (
              <ul className="mt-4 divide-y divide-border">
                {session.recentTopics.slice(0, 6).map((r) => (
                  <li key={`${r.topic}-${r.ts}`} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{r.topic}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.subject} · {r.mode} · {new Date(r.ts).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      to="/assistant"
                      search={{ topic: r.topic, mode: r.mode } as never}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:text-primary"
                    >
                      Reopen
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                No topics yet. Generate your first study set to see it here.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/95 to-success p-6 text-primary-foreground shadow-[var(--shadow-glow)]">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/20"><Flame className="h-4 w-4" /></span>
              <h3 className="font-semibold">Continue Studying</h3>
            </div>
            {hydrated && session.recentTopics[0] ? (
              <>
                <p className="mt-4 text-sm text-white/85">Last topic</p>
                <p className="text-lg font-semibold">{session.recentTopics[0].topic}</p>
                <p className="text-xs text-white/80">
                  {session.recentTopics[0].subject} · {session.recentTopics[0].mode}
                </p>
                <Link
                  to="/assistant"
                  search={{ topic: session.recentTopics[0].topic, mode: session.recentTopics[0].mode } as never}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
                >
                  Resume <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <>
                <p className="mt-4 text-sm text-white/90">Kick off your first study session in the AI Assistant.</p>
                <Link
                  to="/exam-mode"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
                >
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div>
      <div className="text-2xl font-bold">{value}{suffix ?? ""}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
