import { TournamentStage, TicketCategory, PlatformId } from "./types";

export const STAGES: { value: TournamentStage; label: string; shortLabel: string }[] = [
  { value: "group", label: "Group Stage", shortLabel: "Groups" },
  { value: "round-of-32", label: "Round of 32", shortLabel: "R32" },
  { value: "round-of-16", label: "Round of 16", shortLabel: "R16" },
  { value: "quarter-final", label: "Quarter-Finals", shortLabel: "QF" },
  { value: "semi-final", label: "Semi-Finals", shortLabel: "SF" },
  { value: "third-place", label: "Third Place", shortLabel: "3rd" },
  { value: "final", label: "Final", shortLabel: "Final" },
];

export const STAGE_LABELS: Record<TournamentStage, string> = {
  group: "Group Stage",
  "round-of-32": "Round of 32",
  "round-of-16": "Round of 16",
  "quarter-final": "Quarter-Finals",
  "semi-final": "Semi-Finals",
  "third-place": "Third Place",
  final: "Final",
};

export const STAGE_ORDER: Record<TournamentStage, number> = {
  group: 0,
  "round-of-32": 1,
  "round-of-16": 2,
  "quarter-final": 3,
  "semi-final": 4,
  "third-place": 5,
  final: 6,
};

export const CATEGORY_LABELS: Record<TicketCategory, string> = {
  cat1: "Category 1",
  cat2: "Category 2",
  cat3: "Category 3",
  cat4: "Category 4",
};

export const CATEGORY_DESCRIPTIONS: Record<TicketCategory, string> = {
  cat1: "Best seats, lower tier sideline",
  cat2: "Lower tier, behind goals",
  cat3: "Upper tier, sideline",
  cat4: "Upper tier, behind goals",
};

export const PLATFORM_COLORS: Record<PlatformId, { color: string; bg: string }> = {
  stubhub: { color: "#3B1F8E", bg: "#EDE9F6" },
  seatgeek: { color: "#F05537", bg: "#FDE8E4" },
  viagogo: { color: "#00B2A9", bg: "#E0F7F6" },
};

export const BASE_PRICES: Record<TournamentStage, { min: number; max: number }> = {
  group: { min: 80, max: 350 },
  "round-of-32": { min: 150, max: 500 },
  "round-of-16": { min: 200, max: 700 },
  "quarter-final": { min: 300, max: 1200 },
  "semi-final": { min: 500, max: 2000 },
  "third-place": { min: 200, max: 800 },
  final: { min: 800, max: 6700 },
};

export const CATEGORY_MULTIPLIERS: Record<TicketCategory, number> = {
  cat1: 1.0,
  cat2: 0.7,
  cat3: 0.45,
  cat4: 0.3,
};

export const PLATFORM_FEE_RATES: Record<PlatformId, number> = {
  stubhub: 0.15,
  seatgeek: 0.12,
  viagogo: 0.20,
};
