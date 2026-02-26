import { Platform } from "@/lib/types";

export const PLATFORMS: Platform[] = [
  {
    id: "stubhub",
    name: "StubHub",
    color: "#3B1F8E",
    bgColor: "#EDE9F6",
    feePercent: 15,
  },
  {
    id: "seatgeek",
    name: "SeatGeek",
    color: "#F05537",
    bgColor: "#FDE8E4",
    feePercent: 12,
  },
  {
    id: "viagogo",
    name: "Viagogo",
    color: "#00B2A9",
    bgColor: "#E0F7F6",
    feePercent: 20,
  },
];

export const PLATFORM_MAP: Record<string, Platform> = Object.fromEntries(
  PLATFORMS.map((p) => [p.id, p])
);
