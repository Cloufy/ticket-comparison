import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { VENUES } from "@/data/venues";

const STAGE_LINKS = [
  { href: "/?stage=group", label: "Group Stage" },
  { href: "/?stage=round-of-32", label: "Round of 32" },
  { href: "/?stage=round-of-16", label: "Round of 16" },
  { href: "/?stage=quarter-final", label: "Quarter-Finals" },
  { href: "/?stage=semi-final", label: "Semi-Finals" },
  { href: "/?stage=final", label: "Final" },
];

const TOP_VENUES = VENUES.slice(0, 6);

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-16">
      <Container className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Stages */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              Stages
            </h3>
            <ul className="space-y-2">
              {STAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-body hover:text-heading transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Venues */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              Venues
            </h3>
            <ul className="space-y-2">
              {TOP_VENUES.map((venue) => (
                <li key={venue.id}>
                  <Link
                    href={`/venue/${venue.id}`}
                    className="text-sm text-body hover:text-heading transition-colors"
                  >
                    {venue.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              Platforms
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-body">StubHub</li>
              <li className="text-sm text-body">SeatGeek</li>
              <li className="text-sm text-body">Viagogo</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-body hover:text-heading transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-sm text-body hover:text-heading transition-colors">
                  Best Deals
                </Link>
              </li>
              <li>
                <Link href="/trends" className="text-sm text-body hover:text-heading transition-colors">
                  Price Trends
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs text-muted text-center">
            TicketPool is a prototype demo. Prices shown are simulated and do not represent actual ticket listings.
            FIFA World Cup 2026&trade; is a trademark of FIFA.
          </p>
        </div>
      </Container>
    </footer>
  );
}
