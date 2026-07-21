import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, GraduationCap, HeartPulse, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · MedAce AI" },
      {
        name: "description",
        content:
          "MedAce AI is an AI-powered exam companion built for MBBS students preparing for university, professional, viva and OSPE exams.",
      },
      { property: "og:title", content: "About MedAce AI" },
      {
        property: "og:description",
        content: "Learn how MedAce AI helps medical students study smarter.",
      },
    ],
  }),
  component: About,
});

const pillars = [
  {
    icon: GraduationCap,
    title: "Built for MBBS",
    desc: "Aligned with the MBBS curriculum across preclinical, paraclinical and clinical years.",
  },
  {
    icon: HeartPulse,
    title: "Clinically grounded",
    desc: "Answers reference standard texts like Guyton, Robbins, Harrison, and BD Chaurasia.",
  },
  {
    icon: ShieldCheck,
    title: "Exam focused",
    desc: "Structured for university theory, MCQs, viva voce and OSPE stations.",
  },
];

function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" /> About MedAce AI
        </span>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          An AI-powered companion for every medical student.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          MedAce AI was created to help MBBS, BDS, Nursing and Allied Health Sciences
          students prepare for university exams, professional exams, viva voce and OSPE
          stations. It uses AI to turn any topic into structured, exam-ready study material —
          summaries, MCQs, viva drills, simplified explanations and revision plans — in
          seconds.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          Our goal is simple: reduce the time you spend hunting through textbooks so you can
          spend more time actually learning. MedAce AI is your always-available study
          partner, whether you're preparing for a Monday viva or a final professional.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-success/10 text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-success/5 p-8 text-center">
          <h2 className="text-2xl font-bold">Ready to study smarter?</h2>
          <p className="mt-2 text-muted-foreground">
            Open the AI assistant and generate your first study set now.
          </p>
          <Link
            to="/assistant"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" /> Start Studying
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
