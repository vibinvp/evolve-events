"use client";

import { useState } from "react";
import { Check, Loader2, ArrowUpRight } from "lucide-react";
import type { Dict } from "@/i18n/en";

type Fields = { name: string; email: string; phone: string; eventType: string; message: string; website: string };
const empty: Fields = { name: "", email: "", phone: "", eventType: "", message: "", website: "" };

export function ContactForm({ t, lang }: { t: Dict["contact"]["form"]; lang: string }) {
  const [data, setData] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const validate = () => {
    const e: typeof errors = {};
    if (data.name.trim().length < 2) e.name = t.errName;
    if (!data.email) e.email = t.errEmailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = t.errEmail;
    if (data.phone && !/^[0-9+\s()-]{7,}$/.test(data.phone)) e.phone = t.errPhone;
    if (data.message.trim().length < 10) e.message = t.errMessage;
    return e;
  };

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData((d) => ({ ...d, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setData(empty);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div role="status" className="border-t-2 border-magenta bg-paper-2 p-10">
        <span className="mb-5 grid size-12 place-items-center rounded-full bg-brand text-white"><Check className="size-6" /></span>
        <h3 className="text-2xl font-bold">{t.successTitle}</h3>
        <p className="mt-3 leading-relaxed text-ink-soft">{t.successBody}</p>
      </div>
    );
  }

  const input = () => "field";
  const label = "block text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft rtl:tracking-normal rtl:text-sm";
  const err = (k: keyof Fields) =>
    errors[k] && <p id={`e-${k}`} className="mt-1.5 text-sm font-medium text-red-400">{errors[k]}</p>;
  const a11y = (k: keyof Fields) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <form onSubmit={submit} noValidate className="space-y-9">
      <div>
        <label htmlFor="f-name" className={label}>{t.name}</label>
        <input id="f-name" name="name" autoComplete="name" value={data.name} onChange={change} className={input()} {...a11y("name")} />
        {err("name")}
      </div>
      <div className="grid gap-9 sm:grid-cols-2">
        <div>
          <label htmlFor="f-email" className={label}>{t.email}</label>
          <input id="f-email" name="email" type="email" autoComplete="email" dir="ltr" value={data.email} onChange={change} className={input()} {...a11y("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="f-phone" className={label}>{t.phone}</label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" dir="ltr" value={data.phone} onChange={change} className={input()} {...a11y("phone")} />
          {err("phone")}
        </div>
      </div>
      <div>
        <label htmlFor="f-eventType" className={label}>{t.eventType}</label>
        <select id="f-eventType" name="eventType" value={data.eventType} onChange={change} className={input()}>
          <option value="">{t.eventTypePlaceholder}</option>
          {t.eventTypes.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-message" className={label}>{t.message}</label>
        <textarea id="f-message" name="message" rows={5} value={data.message} onChange={change} className={input()} {...a11y("message")} />
        {err("message")}
      </div>

      {/* honeypot — hidden from people, bots fill it */}
      <div aria-hidden className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={change} /></label>
      </div>

      {status === "error" && <p role="alert" className="bg-red-950/50 px-5 py-4 text-sm font-medium text-red-300">{t.errSubmit}</p>}

      <button
        disabled={status === "sending"}
        className="group relative inline-flex w-full items-center justify-between gap-3 overflow-hidden rounded-full bg-white px-8 py-5 font-semibold text-night transition hover:text-white active:scale-[0.98] disabled:opacity-60 before:absolute before:inset-0 before:translate-y-full before:bg-brand before:transition-transform before:duration-500 hover:before:translate-y-0"
      >
        <span className="relative z-10">{status === "sending" ? t.sending : t.submit}</span>
        {status === "sending" ? <Loader2 className="relative z-10 size-5 animate-spin" /> : <ArrowUpRight className="flip-rtl relative z-10 size-5" />}
      </button>
      <p className="text-sm text-ink-soft">{t.note}</p>
    </form>
  );
}
