"use client";

import { TournamentStage, HostCountry, FilterState } from "@/lib/types";
import { STAGES } from "@/lib/constants";
import { VENUES } from "@/data/venues";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const update = (partial: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          type="text"
          placeholder="Search by team, venue, or city..."
          value={filters.searchQuery}
          onChange={(e) => update({ searchQuery: e.target.value })}
          className="w-full rounded-lg border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Stage pills + filters row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Stage pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => update({ stage: "all" })}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              filters.stage === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 text-body hover:bg-gray-200"
            )}
          >
            All
          </button>
          {STAGES.map((s) => (
            <button
              key={s.value}
              onClick={() => update({ stage: s.value as TournamentStage })}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                filters.stage === s.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-body hover:bg-gray-200"
              )}
            >
              {s.shortLabel}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-border hidden sm:block" />

        {/* Country filter */}
        <select
          value={filters.country}
          onChange={(e) => update({ country: e.target.value as HostCountry | "all" })}
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-body focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Countries</option>
          <option value="USA">USA</option>
          <option value="Mexico">Mexico</option>
          <option value="Canada">Canada</option>
        </select>

        {/* Venue filter */}
        <select
          value={filters.venue}
          onChange={(e) => update({ venue: e.target.value })}
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-body focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Venues</option>
          {VENUES.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sortBy}
          onChange={(e) => update({ sortBy: e.target.value as FilterState["sortBy"] })}
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-body focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="date">Sort by Date</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="savings">Biggest Savings</option>
        </select>
      </div>
    </div>
  );
}
