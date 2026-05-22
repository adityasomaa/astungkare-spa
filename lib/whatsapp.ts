import { site } from "@/lib/site";
import { formatIdr } from "@/lib/pricing";

export interface BookingPayload {
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
  const lines: string[] = ["Hi Astungkare Spa — I'd like to book a treatment."];
  if (p.therapy) lines.push(`Therapy: ${p.therapy}${p.duration ? ` · ${p.duration}` : ""}`);
  if (p.people && p.people > 1) lines.push(`People: ${p.people}`);
  if (p.when) lines.push(`When: ${p.when}`);
  const where = [p.villaName, p.location].filter(Boolean).join(", ");
  if (where) lines.push(`Where: ${where}`);
  if (p.totalIdr) lines.push(`Estimated total: ${formatIdr(p.totalIdr)}`);
  if (p.note) lines.push(`Note: ${p.note}`);
  lines.push("Thank you!");
  return lines.join("\n");
}

export function buildWaUrl(p: BookingPayload = {}): string {
  const text = encodeURIComponent(buildWaMessage(p));
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

export function quickWaUrl(prefilledText: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(prefilledText)}`;
}
