import { Match, TournamentStage } from "@/lib/types";
import { TEAMS, GROUPS, getTeamsByGroup } from "./teams";
import { VENUES } from "./venues";
import { hashCode } from "@/lib/utils";

const HIGH_DEMAND_TEAMS = new Set(["usa", "arg", "bra", "fra", "eng", "ger", "esp", "mex"]);

// Venue assignment per group (simplified but realistic)
const GROUP_VENUES: Record<string, string[]> = {
  A: ["estadio-azteca", "estadio-akron", "estadio-bbva"],
  B: ["metlife-stadium", "gillette-stadium", "lincoln-financial"],
  C: ["sofi-stadium", "levis-stadium", "lumen-field"],
  D: ["hard-rock-stadium", "mercedes-benz", "nrg-stadium"],
  E: ["arrowhead-stadium", "att-stadium", "hard-rock-stadium"],
  F: ["sofi-stadium", "metlife-stadium", "att-stadium"],
  G: ["bc-place", "lumen-field", "bmo-field"],
  H: ["mercedes-benz", "nrg-stadium", "arrowhead-stadium"],
  I: ["lincoln-financial", "gillette-stadium", "metlife-stadium"],
  J: ["estadio-bbva", "estadio-akron", "estadio-azteca"],
  K: ["levis-stadium", "sofi-stadium", "hard-rock-stadium"],
  L: ["bmo-field", "bc-place", "att-stadium"],
};

const KNOCKOUT_VENUES: Record<string, string> = {
  "r32-1": "metlife-stadium",
  "r32-2": "sofi-stadium",
  "r32-3": "att-stadium",
  "r32-4": "hard-rock-stadium",
  "r32-5": "estadio-azteca",
  "r32-6": "mercedes-benz",
  "r32-7": "lincoln-financial",
  "r32-8": "lumen-field",
  "r32-9": "gillette-stadium",
  "r32-10": "nrg-stadium",
  "r32-11": "arrowhead-stadium",
  "r32-12": "estadio-akron",
  "r32-13": "levis-stadium",
  "r32-14": "bmo-field",
  "r32-15": "bc-place",
  "r32-16": "estadio-bbva",
  "r16-1": "metlife-stadium",
  "r16-2": "sofi-stadium",
  "r16-3": "att-stadium",
  "r16-4": "hard-rock-stadium",
  "r16-5": "estadio-azteca",
  "r16-6": "mercedes-benz",
  "r16-7": "lincoln-financial",
  "r16-8": "nrg-stadium",
  "qf-1": "metlife-stadium",
  "qf-2": "sofi-stadium",
  "qf-3": "att-stadium",
  "qf-4": "estadio-azteca",
  "sf-1": "metlife-stadium",
  "sf-2": "sofi-stadium",
  "third": "hard-rock-stadium",
  final: "metlife-stadium",
};

function getVenue(venueId: string) {
  return VENUES.find((v) => v.id === venueId)!;
}

function generateGroupMatches(): Match[] {
  const matches: Match[] = [];
  let matchNumber = 1;

  // Base date: June 11, 2026
  const baseDate = new Date("2026-06-11T16:00:00-04:00");
  let dayOffset = 0;

  for (const group of GROUPS) {
    const teams = getTeamsByGroup(group);
    const venues = GROUP_VENUES[group];

    // Round-robin: 6 matches per group
    const pairings: [number, number][] = [
      [0, 1], [2, 3],  // Matchday 1
      [0, 2], [1, 3],  // Matchday 2
      [0, 3], [1, 2],  // Matchday 3
    ];

    pairings.forEach(([h, a], idx) => {
      const matchday = Math.floor(idx / 2);
      const isSecondOfDay = idx % 2 === 1;

      const date = new Date(baseDate);
      date.setDate(date.getDate() + dayOffset + matchday * 6);
      if (isSecondOfDay) date.setHours(date.getHours() + 3);

      const homeTeam = teams[h];
      const awayTeam = teams[a];
      const isHigh = HIGH_DEMAND_TEAMS.has(homeTeam.id) || HIGH_DEMAND_TEAMS.has(awayTeam.id);

      const tags: string[] = [];
      if (matchNumber === 1) tags.push("opener");
      if (isHigh) tags.push("high-profile");
      if (homeTeam.confederation === awayTeam.confederation) tags.push("confederation-clash");

      matches.push({
        id: `gs-${group.toLowerCase()}-${idx + 1}`,
        matchNumber,
        stage: "group",
        group,
        homeTeam,
        awayTeam,
        venue: getVenue(venues[idx % venues.length]),
        datetime: date.toISOString(),
        isHighDemand: isHigh,
        tags,
      });
      matchNumber++;
    });
    dayOffset += 1;
  }

  return matches;
}

function generateKnockoutMatches(startNumber: number): Match[] {
  const matches: Match[] = [];
  let matchNumber = startNumber;

  // For the prototype, assign plausible knockout teams
  // Round of 32: Top 2 from each group + best 3rd place teams
  const knockoutTeams: Record<string, [string, string]> = {
    "r32-1": ["mex", "sen"],
    "r32-2": ["col", "crc"],
    "r32-3": ["por", "par"],
    "r32-4": ["irn", "nzl"],
    "r32-5": ["uru", "cmr"],
    "r32-6": ["kor", "bol"],
    "r32-7": ["bra", "tun"],
    "r32-8": ["ita", "hon"],
    "r32-9": ["arg", "ukr"],
    "r32-10": ["mar", "per"],
    "r32-11": ["usa", "pan"],
    "r32-12": ["eng", "chn"],
    "r32-13": ["fra", "can"],
    "r32-14": ["aut", "idn"],
    "r32-15": ["esp", "aus"],
    "r32-16": ["alg", "svk"],
  };

  const r16Teams: Record<string, [string, string]> = {
    "r16-1": ["mex", "por"],
    "r16-2": ["col", "uru"],
    "r16-3": ["bra", "arg"],
    "r16-4": ["usa", "eng"],
    "r16-5": ["fra", "esp"],
    "r16-6": ["kor", "ita"],
    "r16-7": ["mar", "aut"],
    "r16-8": ["irn", "alg"],
  };

  const qfTeams: Record<string, [string, string]> = {
    "qf-1": ["por", "arg"],
    "qf-2": ["usa", "fra"],
    "qf-3": ["bra", "esp"],
    "qf-4": ["mex", "ita"],
  };

  const sfTeams: Record<string, [string, string]> = {
    "sf-1": ["arg", "fra"],
    "sf-2": ["bra", "mex"],
  };

  const stages: { prefix: string; stage: TournamentStage; count: number; baseDateStr: string; hoursGap: number }[] = [
    { prefix: "r32", stage: "round-of-32", count: 16, baseDateStr: "2026-06-29T13:00:00-04:00", hoursGap: 3 },
    { prefix: "r16", stage: "round-of-16", count: 8, baseDateStr: "2026-07-05T13:00:00-04:00", hoursGap: 4 },
    { prefix: "qf", stage: "quarter-final", count: 4, baseDateStr: "2026-07-09T15:00:00-04:00", hoursGap: 4 },
    { prefix: "sf", stage: "semi-final", count: 2, baseDateStr: "2026-07-13T18:00:00-04:00", hoursGap: 24 },
  ];

  const allKnockoutTeams: Record<string, Record<string, [string, string]>> = {
    "r32": knockoutTeams,
    "r16": r16Teams,
    "qf": qfTeams,
    "sf": sfTeams,
  };

  for (const { prefix, stage, count, baseDateStr, hoursGap } of stages) {
    const baseDate = new Date(baseDateStr);
    const teamMap = allKnockoutTeams[prefix];

    for (let i = 1; i <= count; i++) {
      const key = `${prefix}-${i}`;
      const [homeId, awayId] = teamMap[key];
      const homeTeam = TEAMS.find((t) => t.id === homeId)!;
      const awayTeam = TEAMS.find((t) => t.id === awayId)!;

      const date = new Date(baseDate);
      date.setHours(date.getHours() + (i - 1) * hoursGap);

      const isHigh = HIGH_DEMAND_TEAMS.has(homeId) || HIGH_DEMAND_TEAMS.has(awayId);

      matches.push({
        id: key,
        matchNumber,
        stage,
        homeTeam,
        awayTeam,
        venue: getVenue(KNOCKOUT_VENUES[key]),
        datetime: date.toISOString(),
        isHighDemand: isHigh || stage === "quarter-final" || stage === "semi-final",
        tags: isHigh ? ["high-profile"] : [],
      });
      matchNumber++;
    }
  }

  // Third place
  matches.push({
    id: "third",
    matchNumber,
    stage: "third-place",
    homeTeam: TEAMS.find((t) => t.id === "bra")!,
    awayTeam: TEAMS.find((t) => t.id === "fra")!,
    venue: getVenue(KNOCKOUT_VENUES["third"]),
    datetime: "2026-07-18T16:00:00-04:00",
    isHighDemand: true,
    tags: ["high-profile", "bronze-medal"],
  });
  matchNumber++;

  // Final
  matches.push({
    id: "final",
    matchNumber,
    stage: "final",
    homeTeam: TEAMS.find((t) => t.id === "arg")!,
    awayTeam: TEAMS.find((t) => t.id === "mex")!,
    venue: getVenue(KNOCKOUT_VENUES["final"]),
    datetime: "2026-07-19T16:00:00-04:00",
    isHighDemand: true,
    tags: ["final", "championship"],
  });

  return matches;
}

const groupMatches = generateGroupMatches();
const knockoutMatches = generateKnockoutMatches(groupMatches.length + 1);

export const MATCHES: Match[] = [...groupMatches, ...knockoutMatches];

export const MATCH_MAP: Record<string, Match> = Object.fromEntries(
  MATCHES.map((m) => [m.id, m])
);

export function getMatchesByStage(stage: TournamentStage): Match[] {
  return MATCHES.filter((m) => m.stage === stage);
}

export function getMatchesByVenue(venueId: string): Match[] {
  return MATCHES.filter((m) => m.venue.id === venueId);
}

export function getMatchesByGroup(group: string): Match[] {
  return MATCHES.filter((m) => m.group === group);
}

// Featured matches for trends page
export const FEATURED_MATCH_IDS = [
  "gs-a-1", // Opener: Mexico vs Colombia
  "gs-f-1", // USA vs England
  "gs-e-1", // Argentina vs Peru
  "gs-d-1", // Brazil vs Italy
  "gs-g-1", // France vs Austria
  "r16-3",  // Brazil vs Argentina
  "r16-4",  // USA vs England
  "r16-5",  // France vs Spain
  "qf-1",   // Portugal vs Argentina
  "qf-2",   // USA vs France
  "qf-3",   // Brazil vs Spain
  "qf-4",   // Mexico vs Italy
  "sf-1",   // Argentina vs France
  "sf-2",   // Brazil vs Mexico
  "third",  // Third place
  "final",  // Final
];
