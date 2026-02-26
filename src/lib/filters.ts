import { Match, FilterState } from "./types";
import { MATCH_PRICING } from "@/data/prices";

export function filterMatches(matches: Match[], filters: FilterState): Match[] {
  let result = [...matches];

  // Stage filter
  if (filters.stage !== "all") {
    result = result.filter((m) => m.stage === filters.stage);
  }

  // Venue filter
  if (filters.venue && filters.venue !== "all") {
    result = result.filter((m) => m.venue.id === filters.venue);
  }

  // Country filter
  if (filters.country !== "all") {
    result = result.filter((m) => m.venue.country === filters.country);
  }

  // Search query
  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (m) =>
        m.homeTeam.name.toLowerCase().includes(q) ||
        m.awayTeam.name.toLowerCase().includes(q) ||
        m.homeTeam.shortName.toLowerCase().includes(q) ||
        m.awayTeam.shortName.toLowerCase().includes(q) ||
        m.venue.name.toLowerCase().includes(q) ||
        m.venue.city.toLowerCase().includes(q)
    );
  }

  // Sort
  switch (filters.sortBy) {
    case "date":
      result.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
      break;
    case "price-asc":
      result.sort((a, b) => {
        const pa = MATCH_PRICING[a.id]?.lowestPrice ?? Infinity;
        const pb = MATCH_PRICING[b.id]?.lowestPrice ?? Infinity;
        return pa - pb;
      });
      break;
    case "price-desc":
      result.sort((a, b) => {
        const pa = MATCH_PRICING[a.id]?.lowestPrice ?? 0;
        const pb = MATCH_PRICING[b.id]?.lowestPrice ?? 0;
        return pb - pa;
      });
      break;
    case "savings":
      result.sort((a, b) => {
        const sa = getSavingsAmount(a.id);
        const sb = getSavingsAmount(b.id);
        return sb - sa;
      });
      break;
  }

  return result;
}

function getSavingsAmount(matchId: string): number {
  const pricing = MATCH_PRICING[matchId];
  if (!pricing) return 0;
  return pricing.priceRange.max - pricing.priceRange.min;
}

export const DEFAULT_FILTERS: FilterState = {
  stage: "all",
  venue: "all",
  country: "all",
  searchQuery: "",
  sortBy: "date",
};
