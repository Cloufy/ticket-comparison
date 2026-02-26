import Link from "next/link";
import { Match, PlatformId } from "@/lib/types";
import { MATCH_PRICING, getCardPrices } from "@/data/prices";
import { PLATFORM_MAP } from "@/data/platforms";
import { formatPrice, formatDate } from "@/lib/utils";
import { STAGE_LABELS } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

function PlatformBar({ platformId, price, maxPrice, isCheapest }: {
  platformId: PlatformId;
  price: number;
  maxPrice: number;
  isCheapest: boolean;
}) {
  const platform = PLATFORM_MAP[platformId];
  const widthPercent = Math.max(30, (price / maxPrice) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="w-[70px] flex items-center gap-1.5 shrink-0">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
          style={{ backgroundColor: platform.color }}
        />
        <span className="text-xs text-body truncate">{platform.name}</span>
      </div>
      <div className="flex-1 relative h-5">
        <div
          className="absolute inset-y-0 left-0 rounded-r-full"
          style={{
            width: `${widthPercent}%`,
            backgroundColor: platform.bgColor,
          }}
        />
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-sm font-semibold tabular-nums text-heading">
          {formatPrice(price)}
        </span>
        {isCheapest && (
          <Badge variant="deal" className="text-[10px] px-1.5 py-0">
            Best
          </Badge>
        )}
      </div>
    </div>
  );
}

export function MatchCard({ match }: { match: Match }) {
  const pricing = MATCH_PRICING[match.id];
  const cardPrices = getCardPrices(match.id);
  const maxPrice = Math.max(...cardPrices.map((p) => p.price), 1);

  const stageLabel = match.group
    ? `Group ${match.group}`
    : STAGE_LABELS[match.stage];

  return (
    <Card>
      <Link href={`/match/${match.id}`} className="block p-4">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="stage">{stageLabel}</Badge>
          {pricing && (
            <span className="text-xs font-medium text-muted">
              From {formatPrice(pricing.lowestPrice)}
            </span>
          )}
        </div>

        {/* Teams */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="flex items-center gap-2 flex-1 justify-end">
            <span className="text-sm font-semibold text-heading text-right truncate">
              {match.homeTeam.shortName}
            </span>
            <span className="text-lg">{match.homeTeam.flagEmoji}</span>
          </div>
          <span className="text-xs font-medium text-muted px-2">vs</span>
          <div className="flex items-center gap-2 flex-1">
            <span className="text-lg">{match.awayTeam.flagEmoji}</span>
            <span className="text-sm font-semibold text-heading truncate">
              {match.awayTeam.shortName}
            </span>
          </div>
        </div>

        {/* Venue + Date */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {match.venue.city}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(match.datetime)}
          </span>
        </div>

        {/* Price bars */}
        <div className="space-y-1.5 mb-3">
          {cardPrices.map((cp) => (
            <PlatformBar
              key={cp.platformId}
              platformId={cp.platformId}
              price={cp.price}
              maxPrice={maxPrice}
              isCheapest={cp.isCheapest}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-end text-xs font-medium text-primary pt-2 border-t border-border">
          <span>View match details</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </div>
      </Link>
    </Card>
  );
}
