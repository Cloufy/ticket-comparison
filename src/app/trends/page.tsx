"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getTrends, getMatchHistory } from "@/data/priceHistory";
import { MATCH_MAP } from "@/data/matches";
import { formatPrice, formatDate } from "@/lib/utils";
import { STAGE_LABELS } from "@/lib/constants";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

function Sparkline({ matchId, color }: { matchId: string; color: string }) {
  const history = getMatchHistory(matchId).filter(
    (s) => s.platformId === "stubhub" && s.category === "cat3"
  );

  if (history.length === 0) return null;

  const data = history.map((s) => ({ price: s.price }));

  return (
    <div className="w-24 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            fill={color}
            fillOpacity={0.1}
            strokeWidth={1.5}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function TrendCard({ matchId, change7d, change30d, trend }: {
  matchId: string;
  change7d: number;
  change30d: number;
  trend: "rising" | "falling" | "stable";
}) {
  const match = MATCH_MAP[matchId];
  if (!match) return null;

  const stageLabel = match.group
    ? `Group ${match.group}`
    : STAGE_LABELS[match.stage];

  const TrendIcon = trend === "rising" ? TrendingUp : trend === "falling" ? TrendingDown : Minus;
  const trendColor = trend === "rising" ? "#dc2626" : trend === "falling" ? "#16a34a" : "#94a3b8";
  const trendVariant = trend === "rising" ? "rising" : trend === "falling" ? "falling" : "default";

  return (
    <Link href={`/match/${matchId}`}>
      <Card className="p-4">
        <div className="flex items-center gap-4">
          {/* Match info */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-lg">{match.homeTeam.flagEmoji}</span>
              <span className="text-xs text-muted">vs</span>
              <span className="text-lg">{match.awayTeam.flagEmoji}</span>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-heading truncate">
                {match.homeTeam.shortName} vs {match.awayTeam.shortName}
              </div>
              <div className="text-xs text-muted">
                {stageLabel} &middot; {formatDate(match.datetime)}
              </div>
            </div>
          </div>

          {/* Sparkline */}
          <Sparkline matchId={matchId} color={trendColor} />

          {/* Change */}
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1 justify-end">
              <TrendIcon className="h-4 w-4" style={{ color: trendColor }} />
              <Badge variant={trendVariant}>
                {change7d > 0 ? "+" : ""}{change7d}%
              </Badge>
            </div>
            <div className="text-xs text-muted mt-1">
              30d: {change30d > 0 ? "+" : ""}{change30d}%
            </div>
          </div>

          <ArrowRight className="h-4 w-4 text-muted shrink-0" />
        </div>
      </Card>
    </Link>
  );
}

export default function TrendsPage() {
  const trends = getTrends();

  const risingTrends = trends.filter((t) => t.trend === "rising").sort((a, b) => b.priceChange7d - a.priceChange7d);
  const fallingTrends = trends.filter((t) => t.trend === "falling").sort((a, b) => a.priceChange7d - b.priceChange7d);
  const stableTrends = trends.filter((t) => t.trend === "stable");

  return (
    <>
      {/* Hero */}
      <section className="bg-surface border-b border-border">
        <Container className="py-12 text-center">
          <h1 className="text-3xl font-bold text-heading tracking-tight mb-2">
            Price Trends
          </h1>
          <p className="text-sm text-body max-w-xl mx-auto">
            Track how ticket prices change over time. Spot rising prices before they get too expensive,
            and catch falling prices for great deals.
          </p>
        </Container>
      </section>

      <Container className="py-8 space-y-10">
        {/* Rising */}
        {risingTrends.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-rising" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Prices Rising ({risingTrends.length})
              </h2>
            </div>
            <div className="space-y-2">
              {risingTrends.map((t) => (
                <TrendCard
                  key={t.matchId}
                  matchId={t.matchId}
                  change7d={t.priceChange7d}
                  change30d={t.priceChange30d}
                  trend={t.trend}
                />
              ))}
            </div>
          </section>
        )}

        {/* Falling */}
        {fallingTrends.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="h-4 w-4 text-falling" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Prices Falling ({fallingTrends.length})
              </h2>
            </div>
            <div className="space-y-2">
              {fallingTrends.map((t) => (
                <TrendCard
                  key={t.matchId}
                  matchId={t.matchId}
                  change7d={t.priceChange7d}
                  change30d={t.priceChange30d}
                  trend={t.trend}
                />
              ))}
            </div>
          </section>
        )}

        {/* Stable */}
        {stableTrends.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Minus className="h-4 w-4 text-muted" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Prices Stable ({stableTrends.length})
              </h2>
            </div>
            <div className="space-y-2">
              {stableTrends.map((t) => (
                <TrendCard
                  key={t.matchId}
                  matchId={t.matchId}
                  change7d={t.priceChange7d}
                  change30d={t.priceChange30d}
                  trend={t.trend}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
