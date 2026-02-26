import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MATCHES } from "@/data/matches";
import { MATCH_PRICING, getCardPrices } from "@/data/prices";
import { PLATFORM_MAP } from "@/data/platforms";
import { formatPrice, formatDate } from "@/lib/utils";
import { STAGE_LABELS } from "@/lib/constants";
import { Deal, PlatformId, TicketCategory } from "@/lib/types";
import { ArrowRight, TrendingDown, DollarSign, Zap } from "lucide-react";
import Link from "next/link";

function computeDeals(): Deal[] {
  const deals: Deal[] = [];

  for (const match of MATCHES) {
    const pricing = MATCH_PRICING[match.id];
    if (!pricing) continue;

    // Look at cat3 (most common browsing category)
    const cat: TicketCategory = "cat3";
    const platformPrices: { pid: PlatformId; price: number }[] = [];

    for (const pid of ["stubhub", "seatgeek", "viagogo"] as PlatformId[]) {
      const p = pricing.platforms[pid][cat];
      if (p && p.available) {
        platformPrices.push({ pid, price: p.totalPrice });
      }
    }

    if (platformPrices.length < 2) continue;

    platformPrices.sort((a, b) => a.price - b.price);
    const cheapest = platformPrices[0];
    const nextCheapest = platformPrices[1];
    const savings = nextCheapest.price - cheapest.price;

    if (savings > 5) {
      deals.push({
        match,
        cheapestPlatform: cheapest.pid,
        cheapestPrice: cheapest.price,
        nextCheapestPlatform: nextCheapest.pid,
        nextCheapestPrice: nextCheapest.price,
        savingsAmount: savings,
        savingsPercent: Math.round((savings / nextCheapest.price) * 100),
        category: cat,
      });
    }
  }

  deals.sort((a, b) => b.savingsAmount - a.savingsAmount);
  return deals;
}

export default function DealsPage() {
  const deals = computeDeals();
  const avgSavings = deals.length > 0
    ? Math.round(deals.reduce((sum, d) => sum + d.savingsAmount, 0) / deals.length)
    : 0;
  const maxSavings = deals.length > 0 ? deals[0].savingsAmount : 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-surface border-b border-border">
        <Container className="py-12 text-center">
          <h1 className="text-3xl font-bold text-heading tracking-tight mb-2">
            Best Deals Scanner
          </h1>
          <p className="text-sm text-body max-w-xl mx-auto mb-8">
            Find matches where ticket prices differ the most across platforms.
            Save money by choosing the right seller.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <Zap className="h-5 w-5 text-deal mx-auto mb-1" />
              <div className="text-lg font-bold text-heading">{deals.length}</div>
              <div className="text-xs text-muted">Deals Found</div>
            </div>
            <div className="text-center">
              <DollarSign className="h-5 w-5 text-deal mx-auto mb-1" />
              <div className="text-lg font-bold text-heading">{formatPrice(avgSavings)}</div>
              <div className="text-xs text-muted">Avg Savings</div>
            </div>
            <div className="text-center">
              <TrendingDown className="h-5 w-5 text-deal mx-auto mb-1" />
              <div className="text-lg font-bold text-heading">{formatPrice(maxSavings)}</div>
              <div className="text-xs text-muted">Top Saving</div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-8">
        <div className="space-y-3">
          {deals.slice(0, 40).map((deal) => {
            const stageLabel = deal.match.group
              ? `Group ${deal.match.group}`
              : STAGE_LABELS[deal.match.stage];

            return (
              <Link key={deal.match.id} href={`/match/${deal.match.id}`}>
                <Card className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Match info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">{deal.match.homeTeam.flagEmoji}</span>
                        <span className="text-xs font-medium text-heading">vs</span>
                        <span className="text-lg">{deal.match.awayTeam.flagEmoji}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-heading truncate">
                          {deal.match.homeTeam.shortName} vs {deal.match.awayTeam.shortName}
                        </div>
                        <div className="text-xs text-muted">
                          {stageLabel} &middot; {formatDate(deal.match.datetime)}
                        </div>
                      </div>
                    </div>

                    {/* Price comparison */}
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="text-right">
                        <Badge variant={deal.cheapestPlatform as "stubhub" | "seatgeek" | "viagogo"}>
                          {PLATFORM_MAP[deal.cheapestPlatform].name}
                        </Badge>
                        <div className="text-sm font-bold text-deal mt-1">
                          {formatPrice(deal.cheapestPrice)}
                        </div>
                      </div>

                      <div className="text-xs text-muted">vs</div>

                      <div className="text-right">
                        <Badge variant={deal.nextCheapestPlatform as "stubhub" | "seatgeek" | "viagogo"}>
                          {PLATFORM_MAP[deal.nextCheapestPlatform].name}
                        </Badge>
                        <div className="text-sm font-medium text-body mt-1">
                          {formatPrice(deal.nextCheapestPrice)}
                        </div>
                      </div>

                      {/* Savings */}
                      <div className="text-center shrink-0">
                        <Badge variant="deal">Save {deal.savingsPercent}%</Badge>
                        <div className="text-sm font-bold text-deal mt-1">
                          -{formatPrice(deal.savingsAmount)}
                        </div>
                      </div>

                      <ArrowRight className="h-4 w-4 text-muted shrink-0" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </>
  );
}
