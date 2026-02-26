import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MatchCard } from "@/components/match/MatchCard";
import { VENUES, VENUE_MAP } from "@/data/venues";
import { getMatchesByVenue } from "@/data/matches";
import { MATCH_PRICING } from "@/data/prices";
import { formatPrice } from "@/lib/utils";
import { MapPin, Users, ArrowLeft, ChevronRight, CalendarDays } from "lucide-react";

interface PageProps {
  params: Promise<{ venueSlug: string }>;
}

export default async function VenuePage({ params }: PageProps) {
  const { venueSlug } = await params;
  const venue = VENUE_MAP[venueSlug];
  if (!venue) notFound();

  const venueMatches = getMatchesByVenue(venue.id).sort(
    (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
  );

  // Compute venue stats
  const prices = venueMatches.map((m) => MATCH_PRICING[m.id]?.lowestPrice ?? 0).filter(Boolean);
  const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
  const cheapestPrice = prices.length > 0 ? Math.min(...prices) : 0;

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted mb-6">
        <Link href="/" className="hover:text-heading transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-heading font-medium">{venue.name}</span>
      </nav>

      {/* Venue Header */}
      <Card hover={false} className="p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Venue image placeholder */}
          <div className="h-32 w-full sm:w-48 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
            <MapPin className="h-10 w-10 text-gray-400" />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-heading mb-2">{venue.name}</h1>
            <p className="text-sm text-body mb-4">{venue.city}, {venue.country}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                  <Users className="h-3.5 w-3.5" />
                  Capacity
                </div>
                <div className="text-sm font-semibold text-heading">
                  {venue.capacity.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Matches
                </div>
                <div className="text-sm font-semibold text-heading">
                  {venueMatches.length}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted mb-1">Avg. Ticket</div>
                <div className="text-sm font-semibold text-heading">
                  {formatPrice(avgPrice)}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted mb-1">Cheapest From</div>
                <div className="text-sm font-semibold text-deal">
                  {formatPrice(cheapestPrice)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Matches at this venue */}
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
        Matches at {venue.name} ({venueMatches.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {venueMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </Container>
  );
}

export function generateStaticParams() {
  return VENUES.map((v) => ({ venueSlug: v.id }));
}
