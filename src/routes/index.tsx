import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  ListChecks,
  MessageSquareQuote,
  Lightbulb,
  CalendarClock,
  ArrowRight,
  Sparkles,
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
          "Prepare smarter for MBBS university exams, professional exams, viva and OSPE with AI-generated summaries, MCQs, and revision plans.",
      },
      { property: "og:title", content: "MedAce AI – AI-Powered MBBS Exam Companion" },
      {
        property: "og:description",
        content:
          "AI study companion for MBBS, BDS, Nursing and Allied Health students. Summaries, MCQs, viva practice, and revision plans.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: BookOpen,
    title: "Topic Summarizer",
    desc: "Turn dense chapters into exam-ready notes with clinical pearls.",
  },
  {
    icon: ListChecks,
    title: "MCQ Generator",
    desc: "Practice with high-yield MCQs, answers and explanations.",
  },
  {
    icon: MessageSquareQuote,
    title: "Viva Practice",
    desc: "Rehearse viva questions from basic to advanced with model answers.",
  },
  {
    icon: Lightbulb,
    title: "Simplify Concepts",
    desc: "Break down tough physiology and pathology in plain language.",
  },
  {
    icon: CalendarClock,
    title: "Revision Planner",
    desc: "Structured day-by-day plans to peak on exam day.",
  },
];

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              AI companion for medical students
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Ace your MBBS exams with{" "}
              <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                AI on your side
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              MedAce AI generates structured summaries, MCQs, viva questions, and revision
              plans for university exams, professional exams, viva and OSPE.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/assistant"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
              >
                Start Studying
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Learn more
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
              <span>MBBS · BDS · Nursing · Allied Health</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/10 to-success/10 blur-2xl" />
            <img
              src={heroImg}
              alt="Medical student studying with AI-generated notes and anatomy illustrations"
              className="relative w-full rounded-3xl border border-border bg-white shadow-[var(--shadow-glow)]"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">Your smart study partner</h2>
        <p className="mt-4 text-muted-foreground">
          MedAce AI understands the MBBS curriculum. Give it a topic, and get back
          precisely what you need — a summary, MCQs, a viva drill, a simpler explanation,
          or a revision timetable.
        </p>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-success/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
          <Link
            to="/assistant"
            className="group relative flex flex-col justify-between rounded-2xl border border-transparent bg-gradient-to-br from-primary to-success p-6 text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:-translate-y-1"
          >
            <div>
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-white/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Try the AI Assistant</h3>
              <p className="mt-2 text-sm text-white/85">
                Generate your first study material in seconds.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">
              Open assistant <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
