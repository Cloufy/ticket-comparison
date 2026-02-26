import { MATCH_PRICING } from "@/data/prices";
import { PLATFORMS } from "@/data/platforms";
import { CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "@/lib/constants";
import { TicketCategory, PlatformId } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";

const CATEGORIES: TicketCategory[] = ["cat1", "cat2", "cat3", "cat4"];

export function PriceComparisonTable({ matchId }: { matchId: string }) {
  const pricing = MATCH_PRICING[matchId];
  if (!pricing) return null;

  // Find cheapest per category
  const cheapestPerCategory: Record<TicketCategory, PlatformId | null> = {
    cat1: null, cat2: null, cat3: null, cat4: null,
  };

  for (const cat of CATEGORIES) {
    let minPrice = Infinity;
    for (const platform of PLATFORMS) {
      const p = pricing.platforms[platform.id][cat];
      if (p && p.available && p.totalPrice < minPrice) {
        minPrice = p.totalPrice;
        cheapestPerCategory[cat] = platform.id;
      }
    }
  }

  return (
    <Card hover={false} className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Category
              </th>
              {PLATFORMS.map((platform) => (
                <th key={platform.id} className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className="inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    />
                    <span className="text-xs font-semibold text-heading">
                      {platform.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted mt-0.5">
                    +{platform.feePercent}% fees
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((cat) => (
              <tr key={cat} className="border-b border-border last:border-0">
                <td className="p-4">
                  <div className="text-sm font-medium text-heading">{CATEGORY_LABELS[cat]}</div>
                  <div className="text-xs text-muted">{CATEGORY_DESCRIPTIONS[cat]}</div>
                </td>
                {PLATFORMS.map((platform) => {
                  const price = pricing.platforms[platform.id][cat];
                  const isCheapest = cheapestPerCategory[cat] === platform.id;

                  return (
                    <td
                      key={platform.id}
                      className={cn(
                        "p-4 text-center",
                        isCheapest && "bg-green-50/50"
                      )}
                    >
                      {price && price.available ? (
                        <div>
                          <div className="text-lg font-bold tabular-nums text-heading">
                            {formatPrice(price.totalPrice)}
                          </div>
                          <div className="text-xs text-muted mt-0.5">
                            {formatPrice(price.price)} + {formatPrice(price.fees)} fees
                          </div>
                          <div className="text-xs text-muted">
                            {price.listingCount} listings
                          </div>
                          {isCheapest && (
                            <Badge variant="deal" className="mt-1.5">
                              <Check className="h-3 w-3 mr-0.5" />
                              Cheapest
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-muted">Unavailable</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
