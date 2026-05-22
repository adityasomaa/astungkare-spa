import { site } from "@/lib/site";

export function formatIdr(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `IDR ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `IDR ${(amount / 1000).toFixed(0)}K`;
  }
  return `IDR ${amount.toLocaleString("id-ID")}`;
}

export function idrToUsd(amount: number, rate = site.usdRate): number {
  return Math.round(amount / rate);
}

export function formatUsd(amount: number): string {
  return `~$${amount}`;
}

export function priceWithUsd(idr: number): { idr: string; usd: string } {
  return { idr: formatIdr(idr), usd: formatUsd(idrToUsd(idr)) };
}
