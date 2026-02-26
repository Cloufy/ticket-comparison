export type TournamentStage =
  | "group"
  | "round-of-32"
  | "round-of-16"
  | "quarter-final"
  | "semi-final"
  | "third-place"
  | "final";

export type TicketCategory = "cat1" | "cat2" | "cat3" | "cat4";

export type PlatformId = "stubhub" | "seatgeek" | "viagogo";

export type HostCountry = "USA" | "Mexico" | "Canada";

export interface Team {
  id: string;
  name: string;
  shortName: string;
  fifaCode: string;
  group: string;
  fifaRanking: number;
  confederation: string;
  flagEmoji: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: HostCountry;
  capacity: number;
}

export interface Match {
  id: string;
  matchNumber: number;
  stage: TournamentStage;
  group?: string;
  homeTeam: Team;
  awayTeam: Team;
  venue: Venue;
  datetime: string;
  isHighDemand: boolean;
  tags: string[];
}

export interface Platform {
  id: PlatformId;
  name: string;
  color: string;
  bgColor: string;
  feePercent: number;
}

export interface TicketPrice {
  matchId: string;
  platformId: PlatformId;
  category: TicketCategory;
  price: number;
  fees: number;
  totalPrice: number;
  available: boolean;
  listingCount: number;
}

export interface MatchPricing {
  matchId: string;
  platforms: Record<PlatformId, Partial<Record<TicketCategory, TicketPrice>>>;
  lowestPrice: number;
  lowestPricePlatform: PlatformId;
  lowestPriceCategory: TicketCategory;
  averagePrice: number;
  priceRange: { min: number; max: number };
}

export interface PriceSnapshot {
  matchId: string;
  platformId: PlatformId;
  category: TicketCategory;
  price: number;
  date: string;
}

export interface PriceTrend {
  matchId: string;
  category: TicketCategory;
  snapshots: PriceSnapshot[];
  priceChange7d: number;
  priceChange30d: number;
  trend: "rising" | "falling" | "stable";
}

export interface FilterState {
  stage: TournamentStage | "all";
  venue: string;
  country: HostCountry | "all";
  searchQuery: string;
  sortBy: "date" | "price-asc" | "price-desc" | "savings";
}

export interface Deal {
  match: Match;
  cheapestPlatform: PlatformId;
  cheapestPrice: number;
  nextCheapestPlatform: PlatformId;
  nextCheapestPrice: number;
  savingsAmount: number;
  savingsPercent: number;
  category: TicketCategory;
}
