import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MatchCard } from "@/components/match/MatchCard";
import { PriceComparisonTable } from "@/components/pricing/PriceComparisonTable";
import { PriceChartWrapper } from "@/components/pricing/PriceChartWrapper";
import { MATCH_MAP, MATCHES } from "@/data/matches";
import { MATCH_PRICING } from "@/data/prices";
import { PLATFORM_MAP } from "@/data/platforms";
import { formatPrice, formatDate, formatTime } from "@/lib/utils";
import { STAGE_LABELS } from "@/lib/constants";
import { MapPin, Calendar, Clock, Users, ArrowLeft, ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ matchId: string }>;
}

export default async function MatchDetailPage({ params }: PageProps) {
  const { matchId } = await params;
  const match = MATCH_MAP[matchId];
  if (!match) notFound();

  const pricing = MATCH_PRICING[matchId];
  const stageLabel = match.group ? `Group ${match.group}` : STAGE_LABELS[match.stage];

  // Related matches: same group or same venue
  const relatedMatches = MATCHES.filter(
    (m) =>
      m.id !== match.id &&
      (m.group === match.group || m.venue.id === match.venue.id)
  ).slice(0, 3);

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted mb-6">
        <Link href="/" className="hover:text-heading transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/?stage=${match.stage}`} className="hover:text-heading transition-colors">
          {STAGE_LABELS[match.stage]}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-heading font-medium">
          {match.homeTeam.shortName} vs {match.awayTeam.shortName}
        </span>
      </nav>

      {/* Match Header */}
      <Card hover={false} className="p-6 sm:p-8 mb-8">
        <div className="text-center">
          <Badge variant="stage" className="mb-4">{stageLabel}</Badge>

          {/* Teams */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mb-4">
            <div className="text-center">
              <span className="text-4xl sm:text-5xl block mb-2">{match.homeTeam.flagEmoji}</span>
              <h2 className="text-lg sm:text-xl font-bold text-heading">{match.homeTeam.name}</h2>
              <p className="text-xs text-muted">FIFA #{match.homeTeam.fifaRanking}</p>
            </div>
            <span className="text-2xl font-bold text-muted">vs</span>
            <div className="text-center">
              <span className="text-4xl sm:text-5xl block mb-2">{match.awayTeam.flagEmoji}</span>
              <h2 className="text-lg sm:text-xl font-bold text-heading">{match.awayTeam.name}</h2>
              <p className="text-xs text-muted">FIFA #{match.awayTeam.fifaRanking}</p>
            </div>
          </div>

          {/* Match Info */}
          <div className="flex items-center justify-center gap-6 text-sm text-body">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-muted" />
              {formatDate(match.datetime)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-muted" />
              {formatTime(match.datetime)}
            </span>
            <Link
              href={`/venue/${match.venue.id}`}
              className="flex items-center gap-1.5 hover:text-heading transition-colors"
            >
              <MapPin className="h-4 w-4 text-muted" />
              {match.venue.name}
            </Link>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted" />
              {match.venue.capacity.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      {/* Best Deal Callout */}
      {pricing && (
        <Card hover={false} className="p-4 mb-8 border-deal bg-green-50/50">
          <div className="flex items-center gap-3">
            <Badge variant="deal">Best Deal</Badge>
            <p className="text-sm text-heading">
              <span className="font-semibold">
                {PLATFORM_MAP[pricing.lowestPricePlatform].name}
              </span>
              {" "}has the lowest price at{" "}
              <span className="font-bold text-deal">{formatPrice(pricing.lowestPrice)}</span>
              {pricing.priceRange.max > pricing.lowestPrice && (
                <span className="text-muted">
                  {" "}(save up to {formatPrice(pricing.priceRange.max - pricing.lowestPrice)} vs other platforms)
                </span>
              )}
            </p>
          </div>
        </Card>
      )}

      {/* Price Comparison Table */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
          Price Comparison
        </h3>
        <PriceComparisonTable matchId={matchId} />
      </div>

      {/* Price Chart */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
          Price History (30 Days)
        </h3>
        <PriceChartWrapper matchId={matchId} />
      </div>

      {/* Venue Info */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
          Venue
        </h3>
        <Card hover={false} className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
              <MapPin className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <Link
                href={`/venue/${match.venue.id}`}
                className="text-lg font-semibold text-heading hover:underline"
              >
                {match.venue.name}
              </Link>
              <p className="text-sm text-body mt-1">{match.venue.city}, {match.venue.country}</p>
              <p className="text-xs text-muted mt-1">
                Capacity: {match.venue.capacity.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Related Matches */}
      {relatedMatches.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
            Related Matches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

export function generateStaticParams() {
  return MATCHES.map((m) => ({ matchId: m.id }));
}
