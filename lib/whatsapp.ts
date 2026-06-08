import { site } from "@/lib/site";
import { formatIdr } from "@/lib/pricing";

export interface BookingPayload {
  name?: string;
  therapy?: string;
  duration?: string;
  people?: number;
  when?: string;
  location?: string;
  villaName?: string;
  totalIdr?: number;
  note?: string;
}

export function buildWaMessage(p: BookingPayload = {}): string {
  const details: string[] = [];
  if (p.name) details.push(`Name: ${p.name}`);
  if (p.therapy) details.push(`Therapy: ${p.therapy}${p.duration ? ` · ${p.duration}` : ""}`);
  if (p.people) details.push(`People: ${p.people}`);
  if (p.when) details.push(`When: ${p.when}`);
  const where = [p.villaName, p.location].filter(Boolean).join(", ");
  if (where) details.push(`Where: ${where}`);
  if (p.totalIdr) details.push(`Estimated total: ${formatIdr(p.totalIdr)}`);
  details.push(`Note: ${p.note && p.note.trim() ? p.note.trim() : "(no notes)"}`);

  return [
    "Hi Astungkare Spa, I'd like to book a treatment.",
    "",
    ...details,
    "",
    "Thank you!"
  ].join("\n");
}

export function buildWaUrl(p: BookingPayload = {}): string {
  const text = encodeURIComponent(buildWaMessage(p));
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

export function quickWaUrl(prefilledText: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(prefilledText)}`;
}
