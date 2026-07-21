import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  topic: z.string().min(1).max(500),
  subject: z.string().min(1).max(100),
  year: z.string().min(1).max(50),
  mode: z.enum(["summary", "mcq", "viva", "simplify", "revision"]).default("summary"),
});

const SYSTEM = `You are MedAce AI, an expert MBBS tutor. Produce clear, exam-ready study material for medical students. Use concise markdown with headings, bullet points, and clinically relevant mnemonics. Cite standard MBBS references (Guyton, Robbins, Harrison, Snell, BD Chaurasia) where appropriate. Avoid fluff.`;

function buildPrompt(mode: string, subject: string, year: string, topic: string) {
  const context = `Subject: ${subject}\nMBBS Year: ${year}\nTopic: ${topic}\n`;
  switch (mode) {
    case "mcq":
      return `${context}\nGenerate 8 high-yield exam-style MCQs with 4 options (A-D), correct answer, and a one-line explanation for each.`;
    case "viva":
      return `${context}\nGenerate 10 viva-style questions with model answers (2-4 sentences each), progressing from basic to advanced.`;
    case "simplify":
      return `${context}\nExplain this topic in the simplest possible language, as if teaching a first-year student. Use analogies and short paragraphs.`;
    case "revision":
      return `${context}\nCreate a 3-day revision plan for this topic with daily objectives, key concepts, active recall prompts, and self-test questions.`;
    default:
      return `${context}\nProduce a structured, exam-ready summary: Definition, Etiology/Classification, Pathophysiology, Clinical Features, Investigations, Management, Complications, and 3 high-yield pearls.`;
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
