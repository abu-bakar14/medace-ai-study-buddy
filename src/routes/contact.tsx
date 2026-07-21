import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Github } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · MedAce AI" },
      { name: "description", content: "Get in touch with the MedAce AI team." },
      { property: "og:title", content: "Contact · MedAce AI" },
      { property: "og:description", content: "Reach the MedAce AI team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Mail className="h-3.5 w-3.5" /> Contact
        </span>
        <h1 className="mt-4 text-4xl font-bold">Get in touch</h1>
        <p className="mt-3 text-muted-foreground">
          Feedback, feature requests, or a topic MedAce AI got wrong? We'd love to hear from you.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:hello@medace.ai"
            className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/30"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Mail className="h-5 w-5" /></span>
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm text-muted-foreground">hello@medace.ai</p>
            </div>
          </a>
          <a
            href="#"
            className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/30"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-success/10 text-success"><MessageCircle className="h-5 w-5" /></span>
            <div>
              <p className="font-semibold">Community</p>
              <p className="text-sm text-muted-foreground">Join fellow MBBS students</p>
            </div>
          </a>
        </div>

        <div className="mt-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-success/5 p-6 text-sm text-muted-foreground">
          <p className="inline-flex items-center gap-2 font-medium text-foreground">
            <Github className="h-4 w-4" /> Built by medical educators & engineers
          </p>
          <p className="mt-2">
            MedAce AI is crafted for MBBS students preparing for professional examinations. Your
            feedback shapes what we build next.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
