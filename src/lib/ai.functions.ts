import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  topic: z.string().min(1).max(500),
  subject: z.string().min(1).max(100),
  year: z.string().min(1).max(50),
  mode: z
    .enum(["summary", "mcq", "viva", "simplify", "revision", "clinical", "mnemonics", "rapid"])
    .default("summary"),
});

const SYSTEM = `You are MedAce AI, an expert MBBS tutor. Produce clear, exam-ready study material for medical students. Use concise, well-structured markdown with clear headings (##), bullet points, tables when useful, and clinically relevant mnemonics. Cite standard MBBS references (Guyton, Robbins, Harrison, Snell, BD Chaurasia) where appropriate. Avoid fluff.`;

function buildPrompt(mode: string, subject: string, year: string, topic: string) {
  const context = `Subject: ${subject}\nMBBS Year: ${year}\nTopic: ${topic}\n`;
  switch (mode) {
    case "mcq":
      return `${context}\nGenerate 10 high-yield exam-style MCQs with 4 options (A-D), the correct answer, and a 1-2 line explanation for each. Use ## headings and clear formatting.`;
    case "viva":
      return `${context}\nGenerate 10 viva-style questions with model answers (2-4 sentences each), progressing from basic to advanced. Format as **Q1.** ... **A:** ...`;
    case "simplify":
      return `${context}\nExplain this topic in the simplest possible language, as if teaching a first-year MBBS student. Use analogies and short paragraphs.`;
    case "revision":
      return `${context}\nCreate structured revision notes with sections: Key Points, Must Remember, Common Exam Questions, and a 3-day revision micro-plan.`;
    case "clinical":
      return `${context}\nExplain the clinical correlation of this topic: how it appears in patients, key clinical features, investigations, differential diagnoses, and management pearls. Add one short case vignette at the end.`;
    case "mnemonics":
      return `${context}\nGenerate 6-10 memorable mnemonics for this topic. For each mnemonic, expand every letter and add a one-line clinical/theory note.`;
    case "rapid":
      return `${context}\nProduce a 24-hour rapid revision plan for this topic: Hour-by-hour breakdown, must-know facts, quick MCQs to self-test, and a final 30-minute recap checklist.`;
    default:
      return `${context}\nProduce a structured, exam-ready summary with sections: ## Definition, ## Etiology/Classification, ## Pathophysiology, ## Clinical Features, ## Investigations, ## Management, ## Complications, and ## High-Yield Pearls (3 bullets).`;
  }
}


export const generateStudyMaterial = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      body: JSON.stringify({
        model: "openai/gpt-5.5",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: buildPrompt(data.mode, data.subject, data.year, data.topic) },
        ],
      }),
    });

    if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
    if (res.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`AI request failed (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
