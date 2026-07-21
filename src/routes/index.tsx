import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  ListChecks,
  MessageSquareQuote,
  Lightbulb,
  CalendarClock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Stethoscope,
  Layers,
  FileHeart,
  Smartphone,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedAce AI – AI-Powered MBBS Exam Companion" },
      {
        name: "description",
        content:
          "Prepare smarter for MBBS university, professional, viva and OSPE exams with AI-generated summaries, MCQs, mnemonics, clinical correlations and revision plans.",
      },
      { property: "og:title", content: "MedAce AI – AI-Powered MBBS Exam Companion" },
      {
        property: "og:description",
        content:
          "AI study companion for MBBS, BDS, Nursing and Allied Health students.",
      },
    ],
  }),
  component: Home,
});

const features = [
  { icon: BookOpen, title: "Topic Summarizer", desc: "Turn dense chapters into exam-ready notes with clinical pearls.", color: "from-blue-500/10 to-blue-500/5" },
  { icon: ListChecks, title: "MCQ Generator", desc: "Practice with high-yield MCQs, answers and explanations.", color: "from-emerald-500/10 to-emerald-500/5" },
  { icon: MessageSquareQuote, title: "Viva Practice", desc: "Rehearse viva questions from basic to advanced with model answers.", color: "from-cyan-500/10 to-cyan-500/5" },
  { icon: Lightbulb, title: "Simplify Concepts", desc: "Break down tough physiology and pathology in plain language.", color: "from-amber-500/10 to-amber-500/5" },
  { icon: CalendarClock, title: "Revision Planner", desc: "Structured day-by-day plans to peak on exam day.", color: "from-violet-500/10 to-violet-500/5" },
  { icon: FileHeart, title: "Clinical Case Practice", desc: "Work through realistic clinical scenarios with guided reasoning.", color: "from-rose-500/10 to-rose-500/5" },
  { icon: Layers, title: "Flashcard Generator", desc: "Generate spaced-repetition flashcards for any high-yield topic.", color: "from-teal-500/10 to-teal-500/5" },
];

const badges = [
  { icon: GraduationCap, label: "Trusted by Medical Students" },
  { icon: Sparkles, label: "AI Powered Learning" },
  { icon: ShieldCheck, label: "Exam Focused" },
];

const stats = [
  { icon: Layers, value: "7+", label: "Study Tools" },
  { icon: Sparkles, value: "AI", label: "Powered" },
  { icon: Stethoscope, value: "MBBS", label: "Focused" },
  { icon: Smartphone, value: "100%", label: "Mobile Friendly" },
];

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-success/20 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="animate-fade-in-up">
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur"
                >
                  <b.icon className="h-3.5 w-3.5" /> {b.label}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Ace your MBBS exams with{" "}
              <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                AI on your side
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              MedAce AI generates structured summaries, MCQs, viva questions, mnemonics,
              clinical correlations and revision plans — tuned to the MBBS curriculum.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Start Studying
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Learn more
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> No signup</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Curriculum-aligned</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Works on mobile</span>
            </div>
          </div>
          <div className="relative animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/15 to-success/15 blur-2xl" />
            <div className="relative rounded-3xl border border-border bg-white p-2 shadow-[var(--shadow-glow)]">
              <img
                src={heroImg}
                alt="Medical student studying with AI-generated notes and anatomy illustrations"
                className="w-full rounded-2xl"
                loading="eager"
              />
            </div>
            {/* floating cards */}
            <div className="absolute -left-4 top-8 hidden animate-float-slow rounded-2xl border border-border bg-white p-3 shadow-xl sm:flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary"><Zap className="h-4 w-4" /></span>
              <div className="text-xs">
                <div className="font-semibold">Instant Summaries</div>
                <div className="text-muted-foreground">Ready in seconds</div>
              </div>
            </div>
            <div className="absolute -right-4 bottom-6 hidden animate-float-slow rounded-2xl border border-border bg-white p-3 shadow-xl sm:flex items-center gap-2" style={{ animationDelay: "1.5s" }}>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-success/10 text-success"><ListChecks className="h-4 w-4" /></span>
              <div className="text-xs">
                <div className="font-semibold">Exam-style MCQs</div>
                <div className="text-muted-foreground">With explanations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-white/80 p-4 shadow-[var(--shadow-card)] backdrop-blur sm:grid-cols-4 sm:gap-4 sm:p-6">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-xl px-2 py-1">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-success/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-lg font-bold leading-tight">{s.value}</div>
                  <div className="truncate text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">Your smart study partner</h2>
        <p className="mt-4 text-muted-foreground">
          MedAce AI understands the MBBS curriculum. Give it a topic, and get back
          precisely what you need — a summary, MCQs, a viva drill, mnemonics, a clinical
          correlation, or a revision timetable.
        </p>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${f.color} opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-success/10 text-primary transition-transform group-hover:scale-110">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
          <Link
            to="/dashboard"
            className="group relative flex flex-col justify-between rounded-2xl border border-transparent bg-gradient-to-br from-primary to-success p-6 text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <div>
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-white/20 backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Open the Dashboard</h3>
              <p className="mt-2 text-sm text-white/85">
                Track progress, quick-launch study modes, and continue where you left off.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">
              Enter <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
