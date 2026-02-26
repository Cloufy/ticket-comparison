import { TicketPrice, MatchPricing, PlatformId, TicketCategory } from "@/lib/types";
import { MATCHES } from "./matches";
import { BASE_PRICES, CATEGORY_MULTIPLIERS, PLATFORM_FEE_RATES } from "@/lib/constants";
import { hashCode } from "@/lib/utils";

const PLATFORM_IDS: PlatformId[] = ["stubhub", "seatgeek", "viagogo"];
const CATEGORIES: TicketCategory[] = ["cat1", "cat2", "cat3", "cat4"];

function generatePrice(matchId: string, platformId: PlatformId, category: TicketCategory, stage: string, isHighDemand: boolean): TicketPrice {
  const baseRange = BASE_PRICES[stage as keyof typeof BASE_PRICES] || BASE_PRICES.group;
  const seed = `${matchId}-${platformId}-${category}`;
  const h = hashCode(seed);

  // Base price for cat1
  const normalizedHash = (h % 1000) / 1000;
  let basePrice = baseRange.min + normalizedHash * (baseRange.max - baseRange.min);

  // Apply category multiplier
  basePrice *= CATEGORY_MULTIPLIERS[category];

  // High demand multiplier
  if (isHighDemand) {
    const demandMultiplier = 1.3 + (hashCode(seed + "demand") % 500) / 1000;
    basePrice *= demandMultiplier;
  }

  // Platform variance
  const platformVariance: Record<PlatformId, [number, number]> = {
    stubhub: [-0.05, 0.08],
    seatgeek: [-0.10, 0.05],
    viagogo: [0.05, 0.25],
  };
  const [varMin, varMax] = platformVariance[platformId];
  const variance = varMin + ((hashCode(seed + "var") % 1000) / 1000) * (varMax - varMin);
  basePrice *= (1 + variance);

  const price = Math.round(basePrice);
  const feeRate = PLATFORM_FEE_RATES[platformId];
  const fees = Math.round(price * feeRate);

  return {
    matchId,
    platformId,
    category,
    price,
    fees,
    totalPrice: price + fees,
    available: hashCode(seed + "avail") % 100 > 5, // 95% available
    listingCount: 10 + (hashCode(seed + "count") % 200),
  };
}

// Generate all prices
export const PRICES: TicketPrice[] = [];

for (const match of MATCHES) {
  for (const platformId of PLATFORM_IDS) {
    for (const category of CATEGORIES) {
      PRICES.push(generatePrice(match.id, platformId, category, match.stage, match.isHighDemand));
    }
  }
}

// Build aggregated pricing map
function buildMatchPricing(): Record<string, MatchPricing> {
  const map: Record<string, MatchPricing> = {};

  for (const match of MATCHES) {
    const platforms: MatchPricing["platforms"] = {
      stubhub: {},
      seatgeek: {},
      viagogo: {},
    };

    let lowestPrice = Infinity;
    let lowestPricePlatform: PlatformId = "stubhub";
    let lowestPriceCategory: TicketCategory = "cat4";
    let totalPrice = 0;
    let priceCount = 0;
    let minPrice = Infinity;
    let maxPrice = 0;

    const matchPrices = PRICES.filter((p) => p.matchId === match.id && p.available);

    for (const price of matchPrices) {
      platforms[price.platformId][price.category] = price;

      if (price.totalPrice < lowestPrice) {
        lowestPrice = price.totalPrice;
        lowestPricePlatform = price.platformId;
        lowestPriceCategory = price.category;
      }

      totalPrice += price.totalPrice;
      priceCount++;
      minPrice = Math.min(minPrice, price.totalPrice);
      maxPrice = Math.max(maxPrice, price.totalPrice);
    }

    map[match.id] = {
      matchId: match.id,
      platforms,
      lowestPrice,
      lowestPricePlatform,
      lowestPriceCategory,
      averagePrice: priceCount > 0 ? Math.round(totalPrice / priceCount) : 0,
      priceRange: { min: minPrice === Infinity ? 0 : minPrice, max: maxPrice },
    };
  }

  return map;
}

export const MATCH_PRICING = buildMatchPricing();

// Helper: get the cheapest price per platform for a given category
export function getCheapestByCategory(matchId: string, category: TicketCategory): { platformId: PlatformId; price: TicketPrice } | null {
  const pricing = MATCH_PRICING[matchId];
  if (!pricing) return null;

  let cheapest: TicketPrice | null = null;
  let cheapestPlatform: PlatformId = "stubhub";

  for (const pid of PLATFORM_IDS) {
    const p = pricing.platforms[pid][category];
    if (p && p.available && (!cheapest || p.totalPrice < cheapest.totalPrice)) {
      cheapest = p;
      cheapestPlatform = pid;
    }
  }

  return cheapest ? { platformId: cheapestPlatform, price: cheapest } : null;
}

// Get lowest cat3 price per platform for card display
export function getCardPrices(matchId: string): { platformId: PlatformId; price: number; isCheapest: boolean }[] {
  const pricing = MATCH_PRICING[matchId];
  if (!pricing) return [];

  const cat: TicketCategory = "cat3"; // Show cat3 as the default "from" price
  const results: { platformId: PlatformId; price: number; isCheapest: boolean }[] = [];
  let min = Infinity;

  for (const pid of PLATFORM_IDS) {
    const p = pricing.platforms[pid][cat];
    if (p && p.available) {
      results.push({ platformId: pid, price: p.totalPrice, isCheapest: false });
      if (p.totalPrice < min) min = p.totalPrice;
    }
  }

  for (const r of results) {
    if (r.price === min) r.isCheapest = true;
  }

  return results;
}
