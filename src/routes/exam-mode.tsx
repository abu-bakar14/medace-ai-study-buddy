import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, GraduationCap, BookOpenCheck } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/exam-mode")({
  head: () => ({
    meta: [
      { title: "Exam Mode · MedAce AI" },
      { name: "description", content: "Select your MBBS year and subject to personalise every AI study session." },
      { property: "og:title", content: "Exam Mode · MedAce AI" },
      { property: "og:description", content: "Personalise your MBBS study session." },
    ],
  }),
  component: ExamMode,
});

const YEARS = ["First Year", "Second Year", "Third Year", "Fourth Year", "Final Year"];
const SUBJECTS = [
  "Anatomy", "Physiology", "Biochemistry", "Pharmacology", "Pathology", "Microbiology",
  "Forensic Medicine", "Community Medicine", "Medicine", "Surgery",
  "Obstetrics & Gynaecology", "Pediatrics",
];

function ExamMode() {
  const navigate = useNavigate();
  const { session, hydrated, update } = useSession();
  const [step, setStep] = useState<1 | 2>(1);
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    if (hydrated) {
      setYear(session.year || "");
      setSubject(session.subject || "");
    }
  }, [hydrated, session.year, session.subject]);

  function next() {
    if (!year) return;
    setStep(2);
  }
  function finish() {
    if (!year || !subject) return;
    update({ year, subject });
    navigate({ to: "/assistant" });
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <GraduationCap className="h-3.5 w-3.5" /> Exam Mode Setup
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Personalise your study session</h1>
          <p className="mt-3 text-muted-foreground">Step {step} of 2 — this powers every AI response you generate.</p>
        </div>

        {/* Progress */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-success transition-all duration-500"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{step === 1 ? "50%" : "100%"}</span>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8 animate-fade-in-up">
          {step === 1 ? (
            <>
              <h2 className="text-xl font-bold">Which year of MBBS are you in?</h2>
              <p className="mt-1 text-sm text-muted-foreground">We'll tailor the depth and focus to your curriculum.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {YEARS.map((y) => {
                  const active = year === y;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setYear(y)}
                      className={`group flex items-center justify-between rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                        active
                          ? "border-primary bg-primary/5 shadow-[var(--shadow-card)]"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <span className="font-medium">{y}</span>
                      {active ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <span className="h-5 w-5 rounded-full border border-border" />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={next}
                  disabled={!year}
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <BookOpenCheck className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Pick your subject</h2>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Choose the subject you want to focus on this session.</p>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {SUBJECTS.map((s) => {
                  const active = subject === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSubject(s)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all hover:-translate-y-0.5 ${
                        active
                          ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex flex-wrap justify-between gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={finish}
                  disabled={!subject}
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-success px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Enter AI Assistant <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
