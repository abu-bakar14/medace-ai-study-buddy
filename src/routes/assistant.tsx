import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Sparkles, Loader2, BookOpen, ListChecks, MessageSquareQuote, Lightbulb, CalendarClock } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { generateStudyMaterial } from "@/lib/ai.functions";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Study Assistant · MedAce AI" },
      {
        name: "description",
        content:
          "Enter any MBBS topic and generate exam-ready summaries, MCQs, viva questions or revision plans.",
      },
      { property: "og:title", content: "AI Study Assistant · MedAce AI" },
      {
        property: "og:description",
        content: "AI-generated study material for MBBS students.",
      },
    ],
  }),
  component: AssistantPage,
});

const SUBJECTS = [
  "Anatomy",
  "Physiology",
  "Biochemistry",
  "Pathology",
  "Pharmacology",
  "Microbiology",
  "Forensic Medicine",
  "Community Medicine",
  "Medicine",
  "Surgery",
  "Obstetrics & Gynaecology",
  "Paediatrics",
  "ENT",
  "Ophthalmology",
  "Orthopaedics",
  "Psychiatry",
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year", "Internship"];

const MODES = [
  { id: "summary", label: "Summary", icon: BookOpen },
  { id: "mcq", label: "MCQs", icon: ListChecks },
  { id: "viva", label: "Viva", icon: MessageSquareQuote },
  { id: "simplify", label: "Simplify", icon: Lightbulb },
  { id: "revision", label: "Revision Plan", icon: CalendarClock },
] as const;

type Mode = (typeof MODES)[number]["id"];

function AssistantPage() {
  const generate = useServerFn(generateStudyMaterial);
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[3]);
  const [year, setYear] = useState(YEARS[1]);
  const [mode, setMode] = useState<Mode>("summary");

  const mutation = useMutation({
    mutationFn: (vars: { topic: string; subject: string; year: string; mode: Mode }) =>
      generate({ data: vars }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    mutation.mutate({ topic: topic.trim(), subject, year, mode });
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI Study Assistant
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Generate study material</h1>
          <p className="mt-3 text-muted-foreground">
            Pick a mode, tell us the topic, and MedAce AI will produce exam-ready notes.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-7"
        >
          {/* Mode pills */}
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
                {SUBJECTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium">MBBS Year</span>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {YEARS.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending || !topic.trim()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-success px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate
              </>
            )}
          </button>
        </form>

        {/* Response card */}
        <div className="mt-8 min-h-[280px] rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
          {mutation.isIdle && (
            <div className="grid h-64 place-items-center text-center text-muted-foreground">
              <div>
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/10 to-success/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="mt-3 text-sm">Your AI-generated study material will appear here.</p>
              </div>
            </div>
          )}
          {mutation.isPending && (
            <div className="grid h-64 place-items-center text-muted-foreground">
              <div className="flex items-center gap-3 text-sm">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                Cooking up your notes…
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
      </section>
    </SiteLayout>
  );
}
