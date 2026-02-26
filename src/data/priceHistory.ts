import { PriceSnapshot, PriceTrend, PlatformId, TicketCategory } from "@/lib/types";
import { FEATURED_MATCH_IDS } from "./matches";
import { MATCH_PRICING } from "./prices";
import { hashCode } from "@/lib/utils";

const PLATFORM_IDS: PlatformId[] = ["stubhub", "seatgeek", "viagogo"];

function generateHistory(matchId: string, platformId: PlatformId, category: TicketCategory): PriceSnapshot[] {
  const pricing = MATCH_PRICING[matchId];
  if (!pricing) return [];

  const currentPrice = pricing.platforms[platformId][category];
  if (!currentPrice) return [];

  const snapshots: PriceSnapshot[] = [];
  const basePrice = currentPrice.totalPrice;

  // Generate 30 days of history going backward
  for (let day = 30; day >= 0; day--) {
    const date = new Date("2026-06-01");
    date.setDate(date.getDate() - day);

    const seed = `${matchId}-${platformId}-${category}-${day}`;
    const h = hashCode(seed);

    // Prices generally trend upward as event approaches
    // Start at 70-90% of current price, with daily fluctuations
    const trendFactor = 0.70 + (0.30 * (30 - day) / 30);
    const dailyNoise = -0.05 + ((h % 100) / 100) * 0.10;
    const price = Math.round(basePrice * (trendFactor + dailyNoise));

    snapshots.push({
      matchId,
      platformId,
      category,
      price: Math.max(price, 20),
      date: date.toISOString().split("T")[0],
    });
  }

  return snapshots;
}

export const PRICE_HISTORY: PriceSnapshot[] = [];

for (const matchId of FEATURED_MATCH_IDS) {
  for (const platformId of PLATFORM_IDS) {
    PRICE_HISTORY.push(...generateHistory(matchId, platformId, "cat3"));
  }
}

// Build trend summaries
export function getTrends(): PriceTrend[] {
  const trends: PriceTrend[] = [];

  for (const matchId of FEATURED_MATCH_IDS) {
    const matchSnapshots = PRICE_HISTORY.filter(
      (s) => s.matchId === matchId && s.category === "cat3" && s.platformId === "stubhub"
    ).sort((a, b) => a.date.localeCompare(b.date));

    if (matchSnapshots.length < 8) continue;

    const latest = matchSnapshots[matchSnapshots.length - 1].price;
    const sevenDaysAgo = matchSnapshots[matchSnapshots.length - 8]?.price || latest;
    const thirtyDaysAgo = matchSnapshots[0]?.price || latest;

    const change7d = ((latest - sevenDaysAgo) / sevenDaysAgo) * 100;
    const change30d = ((latest - thirtyDaysAgo) / thirtyDaysAgo) * 100;

    let trend: "rising" | "falling" | "stable" = "stable";
    if (change7d > 3) trend = "rising";
    else if (change7d < -3) trend = "falling";

    trends.push({
      matchId,
      category: "cat3",
      snapshots: matchSnapshots,
      priceChange7d: Math.round(change7d * 10) / 10,
      priceChange30d: Math.round(change30d * 10) / 10,
      trend,
    });
  }

  return trends;
}

export function getMatchHistory(matchId: string): PriceSnapshot[] {
  return PRICE_HISTORY.filter((s) => s.matchId === matchId).sort(
    (a, b) => a.date.localeCompare(b.date)
  );
}
