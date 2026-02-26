import { Venue } from "@/lib/types";

export const VENUES: Venue[] = [
  // USA (11 venues)
  { id: "metlife-stadium", name: "MetLife Stadium", city: "East Rutherford, NJ", country: "USA", capacity: 82500 },
  { id: "sofi-stadium", name: "SoFi Stadium", city: "Inglewood, CA", country: "USA", capacity: 70240 },
  { id: "att-stadium", name: "AT&T Stadium", city: "Arlington, TX", country: "USA", capacity: 80000 },
  { id: "hard-rock-stadium", name: "Hard Rock Stadium", city: "Miami Gardens, FL", country: "USA", capacity: 64767 },
  { id: "lincoln-financial", name: "Lincoln Financial Field", city: "Philadelphia, PA", country: "USA", capacity: 69328 },
  { id: "mercedes-benz", name: "Mercedes-Benz Stadium", city: "Atlanta, GA", country: "USA", capacity: 71000 },
  { id: "lumen-field", name: "Lumen Field", city: "Seattle, WA", country: "USA", capacity: 68740 },
  { id: "gillette-stadium", name: "Gillette Stadium", city: "Foxborough, MA", country: "USA", capacity: 65878 },
  { id: "nrg-stadium", name: "NRG Stadium", city: "Houston, TX", country: "USA", capacity: 72220 },
  { id: "arrowhead-stadium", name: "GEHA Field at Arrowhead", city: "Kansas City, MO", country: "USA", capacity: 76416 },
  { id: "levis-stadium", name: "Levi's Stadium", city: "Santa Clara, CA", country: "USA", capacity: 68500 },
  // Mexico (3 venues)
  { id: "estadio-azteca", name: "Estadio Azteca", city: "Mexico City", country: "Mexico", capacity: 87523 },
  { id: "estadio-akron", name: "Estadio Akron", city: "Guadalajara", country: "Mexico", capacity: 49850 },
  { id: "estadio-bbva", name: "Estadio BBVA", city: "Monterrey", country: "Mexico", capacity: 53500 },
  // Canada (2 venues)
  { id: "bmo-field", name: "BMO Field", city: "Toronto", country: "Canada", capacity: 45500 },
  { id: "bc-place", name: "BC Place", city: "Vancouver", country: "Canada", capacity: 54500 },
];

export const VENUE_MAP: Record<string, Venue> = Object.fromEntries(
  VENUES.map((v) => [v.id, v])
);
