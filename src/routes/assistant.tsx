import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import {
  Sparkles, Loader2, BookOpen, ListChecks, MessageSquareQuote, Lightbulb,
  CalendarClock, FileHeart, Brain, Zap, Wand2, Clock3, Timer, GraduationCap,
} from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { generateStudyMaterial } from "@/lib/ai.functions";
import { useSession } from "@/hooks/use-session";

const searchSchema = z.object({
  topic: z.string().optional(),
  mode: z.string().optional(),
});

export const Route = createFileRoute("/assistant")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "AI Study Assistant · MedAce AI" },
      { name: "description", content: "Generate MBBS summaries, MCQs, viva questions, mnemonics and clinical correlations with AI." },
      { property: "og:title", content: "AI Study Assistant · MedAce AI" },
      { property: "og:description", content: "AI-generated study material for MBBS students." },
    ],
  }),
  component: AssistantPage,
});

const SUBJECTS = [
  "Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Microbiology",
  "Forensic Medicine", "Community Medicine", "Medicine", "Surgery",
  "Obstetrics & Gynaecology", "Pediatrics",
];
const YEARS = ["First Year", "Second Year", "Third Year", "Fourth Year", "Final Year"];

const MODES = [
  { id: "summary", label: "Summary", icon: BookOpen },
  { id: "viva", label: "Viva Questions", icon: MessageSquareQuote },
  { id: "mcq", label: "MCQs", icon: ListChecks },
  { id: "simplify", label: "Simplify Concepts", icon: Lightbulb },
  { id: "clinical", label: "Clinical Correlation", icon: FileHeart },
  { id: "revision", label: "Revision Notes", icon: CalendarClock },
  { id: "mnemonics", label: "Mnemonics", icon: Brain },
  { id: "rapid", label: "Rapid Revision", icon: Zap },
] as const;

type Mode = (typeof MODES)[number]["id"];

const QUICK_PROMPTS: { label: string; icon: typeof Wand2; mode: Mode; topicPrefix?: string }[] = [
  { label: "Explain Like I'm a First-Year MBBS Student", icon: Lightbulb, mode: "simplify" },
  { label: "Generate 10 Professional Exam MCQs", icon: ListChecks, mode: "mcq" },
  { label: "Conduct a Viva", icon: MessageSquareQuote, mode: "viva" },
  { label: "Create High Yield Notes", icon: BookOpen, mode: "summary" },
  { label: "Generate Mnemonics", icon: Brain, mode: "mnemonics" },
  { label: "Prepare Me in 24 Hours", icon: Timer, mode: "rapid" },
  { label: "Explain Clinical Correlation", icon: FileHeart, mode: "clinical" },
];

function AssistantPage() {
  const generate = useServerFn(generateStudyMaterial);
  const { session, hydrated, update, pushRecent } = useSession();
  const search = Route.useSearch();

  const [topic, setTopic] = useState(search.topic ?? "");
  const [subject, setSubject] = useState(SUBJECTS[3]);
  const [year, setYear] = useState(YEARS[1]);
  const [mode, setMode] = useState<Mode>(
    (MODES.find((m) => m.id === search.mode)?.id as Mode) ?? "summary",
  );

  useEffect(() => {
    if (!hydrated) return;
    if (session.subject) setSubject(session.subject);
    if (session.year) setYear(session.year);
  }, [hydrated, session.subject, session.year]);

  const mutation = useMutation({
    mutationFn: (vars: { topic: string; subject: string; year: string; mode: Mode }) =>
      generate({ data: vars }),
    onSuccess: (_data, vars) => {
      pushRecent({ topic: vars.topic, subject: vars.subject, mode: vars.mode });
    },
  });

  function submit(next?: { topic?: string; mode?: Mode }) {
    const t = (next?.topic ?? topic).trim();
    const m = next?.mode ?? mode;
    if (!t) return;
    update({ year, subject });
    mutation.mutate({ topic: t, subject, year, mode: m });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  function runQuick(q: (typeof QUICK_PROMPTS)[number]) {
    setMode(q.mode);
    if (!topic.trim()) return;
    submit({ mode: q.mode });
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI Study Assistant
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Generate exam-ready study material</h1>
          <p className="mt-3 text-muted-foreground">
            Choose a study mode, enter a topic, and MedAce AI does the heavy lifting.
          </p>
          {hydrated && session.year && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium text-foreground">{session.year}</span> · {session.subject}
            </div>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-7 animate-fade-in-up"
        >
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => {
              const active = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <m.icon className="h-4 w-4" />
                  {m.label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium">Topic</span>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Rheumatic heart disease"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Subject</span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium">MBBS Year</span>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
            </label>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending || !topic.trim()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-success px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {mutation.isPending ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</>
            ) : (
              <><Sparkles className="h-4 w-4" /> Generate</>
            )}
          </button>
        </form>

        {/* Quick prompts */}
        <div className="mt-8 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Quick Prompt Templates</h2>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => runQuick(q)}
                disabled={mutation.isPending}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary disabled:opacity-60"
                title={topic ? `Run: ${q.label}` : "Enter a topic first"}
              >
                <q.icon className="h-3.5 w-3.5" />
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Response card */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/5 to-success/5 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-primary shadow"><Sparkles className="h-4 w-4" /></span>
              <div>
                <p className="text-sm font-semibold">AI Response</p>
                <p className="text-xs text-muted-foreground">
                  {MODES.find((m) => m.id === mode)?.label} · {subject} · {year}
                </p>
              </div>
            </div>
            {mutation.isPending && (
              <span className="inline-flex items-center gap-1.5 text-xs text-primary">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
              </span>
            )}
          </div>
          <div className="min-h-[280px] p-6 sm:p-8">
            {mutation.isIdle && (
              <div className="grid h-64 place-items-center text-center text-muted-foreground">
                <div>
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/10 to-success/10 text-primary animate-pulse-ring">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm">Your AI-generated study material will appear here.</p>
                  <p className="mt-1 text-xs">Try a quick prompt above ↑</p>
                </div>
              </div>
            )}
            {mutation.isPending && (
              <div className="space-y-3">
                <p className="shimmer-text text-sm font-medium">Cooking up your notes…</p>
                <div className="space-y-2">
                  <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            )}
            {mutation.isError && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                {(mutation.error as Error).message}
              </div>
            )}
            {mutation.isSuccess && (
              <article className="prose prose-slate max-w-none whitespace-pre-wrap text-[15px] leading-relaxed text-foreground">
                {mutation.data.content}
              </article>
            )}
          </div>
        </div>

        {/* Recent activity */}
        {hydrated && session.recentTopics.length > 0 && (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <RecentList
              title="Recent Topics"
              icon={Clock3}
              items={session.recentTopics.slice(0, 5)}
              onPick={(r) => { setTopic(r.topic); setMode(r.mode as Mode); }}
            />
            <RecentList
              title="Recently Generated MCQs & Viva"
              icon={ListChecks}
              items={session.recentTopics.filter((r) => r.mode === "mcq" || r.mode === "viva").slice(0, 5)}
              onPick={(r) => { setTopic(r.topic); setMode(r.mode as Mode); }}
              emptyText="Generate MCQs or a viva to see them here."
            />
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function RecentList({
  title, icon: Icon, items, onPick, emptyText,
}: {
  title: string;
  icon: typeof Clock3;
  items: { topic: string; subject: string; mode: string; ts: number }[];
  onPick: (r: { topic: string; mode: string }) => void;
  emptyText?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {items.length ? (
        <ul className="mt-4 divide-y divide-border">
          {items.map((r) => (
            <li key={`${r.topic}-${r.ts}`} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{r.topic}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {r.subject} · {r.mode} · {new Date(r.ts).toLocaleDateString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onPick({ topic: r.topic, mode: r.mode })}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:border-primary/40 hover:text-primary"
              >
                Load
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">{emptyText ?? "Nothing yet."}</p>
      )}
    </div>
  );
}
