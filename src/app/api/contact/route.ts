import { NextResponse } from "next/server";
import { CONTACT } from "@/i18n/config";

type Body = Record<string, unknown>;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const eventType = str(body.eventType, 80);
  const message = str(body.message, 4000);
  const lang = str(body.lang, 5);

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Never claim success when nothing was delivered.
    console.error("[contact] RESEND_API_KEY is not set — enquiry was NOT sent:", { name, email, eventType });
    return NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Evolve Events Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? CONTACT.email],
      reply_to: email,
      subject: `New enquiry from ${name}${eventType ? ` — ${eventType}` : ""}`,
      html: `<h2>New website enquiry</h2>
<p><b>Name:</b> ${esc(name)}</p><p><b>Email:</b> ${esc(email)}</p><p><b>Phone:</b> ${esc(phone) || "—"}</p>
<p><b>Event type:</b> ${esc(eventType) || "—"}</p><p><b>Language:</b> ${esc(lang)}</p>
<p><b>Message:</b><br>${esc(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
