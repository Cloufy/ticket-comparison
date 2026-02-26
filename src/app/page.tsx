"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { MatchGrid } from "@/components/match/MatchGrid";
import { FilterBar } from "@/components/filters/FilterBar";
import { MATCHES } from "@/data/matches";
import { filterMatches, DEFAULT_FILTERS } from "@/lib/filters";
import { FilterState, TournamentStage } from "@/lib/types";
import { STAGE_LABELS, STAGES } from "@/lib/constants";
import { Ticket, TrendingUp, Shield } from "lucide-react";

const STATS = [
  { icon: Ticket, label: "Matches", value: "104" },
  { icon: Shield, label: "Platforms", value: "3" },
  { icon: TrendingUp, label: "Price Comparisons", value: "3,700+" },
];

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const filteredMatches = useMemo(() => filterMatches(MATCHES, filters), [filters]);

  const isShowingAll = filters.stage === "all" && !filters.searchQuery && filters.venue === "all" && filters.country === "all";

  // Group matches by stage for the "all" view
  const groupedByStage = useMemo(() => {
    if (!isShowingAll) return null;
    const groups: Partial<Record<TournamentStage, typeof filteredMatches>> = {};
    for (const stage of STAGES) {
      const stageMatches = filteredMatches.filter((m) => m.stage === stage.value);
      if (stageMatches.length > 0) {
        groups[stage.value as TournamentStage] = stageMatches;
      }
    }
    return groups;
  }, [filteredMatches, isShowingAll]);

  return (
    <>
      {/* Hero */}
      <section className="bg-surface border-b border-border">
        <Container className="py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-heading tracking-tight mb-3">
            Compare World Cup 2026 Ticket Prices
          </h1>
          <p className="text-body text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Find the best deals across StubHub, SeatGeek, and Viagogo for all 104 matches.
            Track prices, spot deals, and never overpay.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-5 w-5 text-muted mx-auto mb-1" />
                <div className="text-lg font-bold text-heading">{stat.value}</div>
                <div className="text-xs text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Filters + Results */}
      <Container className="py-8">
        <FilterBar filters={filters} onFiltersChange={setFilters} />

        <div className="mt-6">
          {isShowingAll && groupedByStage ? (
            // Grouped view
            <div className="space-y-10">
              {Object.entries(groupedByStage).map(([stage, matches]) => {
                const previewMatches = matches.slice(0, 6);
                const hasMore = matches.length > 6;

                return (
                  <section key={stage}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                        {STAGE_LABELS[stage as TournamentStage]} ({matches.length})
                      </h2>
                      {hasMore && (
                        <button
                          onClick={() => setFilters({ ...filters, stage: stage as TournamentStage })}
                          className="text-xs font-medium text-primary hover:underline"
                        >
                          View all {matches.length}
                        </button>
                      )}
                    </div>
                    <MatchGrid matches={previewMatches} />
                  </section>
                );
              })}
            </div>
          ) : (
            // Filtered view
            <>
              <div className="mb-4">
                <p className="text-xs text-muted">
                  {filteredMatches.length} match{filteredMatches.length !== 1 ? "es" : ""} found
                </p>
              </div>
              <MatchGrid matches={filteredMatches} />
            </>
          )}
        </div>
      </Container>
    </>
  );
}
