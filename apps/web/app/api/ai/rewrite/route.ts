import { NextResponse } from "next/server";

type Tone = "friendly" | "professional" | "short";

export async function POST(request: Request) {
  const body = (await request.json()) as { text?: string; tone?: Tone };
  const text = (body.text ?? "").trim();
  const tone = body.tone ?? "professional";

  if (!text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  let rewritten = text;

  if (tone === "friendly") {
    rewritten = `Friendly summary: ${text} Next step: confirm details with applicant.`;
  }

  if (tone === "professional") {
    rewritten = `Professional note: ${text} Action requested: review and approve for committee.`;
  }

  if (tone === "short") {
    rewritten = text.length > 120 ? `${text.slice(0, 117)}...` : text;
  }

  return NextResponse.json({ data: { rewritten } });
}
