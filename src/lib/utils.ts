import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(iso: string): string {
  return format(new Date(iso), "MMM d, yyyy");
}

export function formatTime(iso: string): string {
  return format(new Date(iso), "h:mm a");
}

export function formatDateTime(iso: string): string {
  return format(new Date(iso), "MMM d, yyyy 'at' h:mm a");
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Deterministic hash for consistent pseudo-random generation
export function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

// Seeded pseudo-random number between min and max
export function seededRandom(seed: string, min: number, max: number): number {
  const h = hashCode(seed);
  const normalized = (h % 10000) / 10000;
  return Math.round(min + normalized * (max - min));
}

export function seededRandomFloat(seed: string, min: number, max: number): number {
  const h = hashCode(seed);
  const normalized = (h % 10000) / 10000;
  return min + normalized * (max - min);
}
