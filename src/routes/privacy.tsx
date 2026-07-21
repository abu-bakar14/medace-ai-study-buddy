import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · MedAce AI" },
      { name: "description", content: "How MedAce AI handles your study data and preferences." },
      { property: "og:title", content: "Privacy Policy · MedAce AI" },
      { property: "og:description", content: "How MedAce AI handles your data." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Shield className="h-3.5 w-3.5" /> Privacy Policy
        </span>
        <h1 className="mt-4 text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: 2026</p>

        <div className="prose prose-slate mt-8 max-w-none">
          <h2>What we store</h2>
          <p>
            MedAce AI stores your MBBS year, subject and recently studied topics in your browser
            (local storage) so we can personalise your session. This data never leaves your device
            unless you explicitly submit it to generate study material.
          </p>
          <h2>What we send to AI</h2>
          <p>
            When you generate study material, your topic, subject and year are sent securely to our
            AI provider so we can produce an accurate response. Requests are not used to train
            third-party models.
          </p>
          <h2>Your control</h2>
          <p>
            You can clear your stored preferences at any time by clearing your browser storage. We
            do not require signup and we do not sell your data.
          </p>
          <h2>Questions?</h2>
          <p>
            Reach out via the <Link to="/contact" className="text-primary underline">contact page</Link>.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
