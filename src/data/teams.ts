import { Team } from "@/lib/types";

export const TEAMS: Team[] = [
  // Group A
  { id: "mex", name: "Mexico", shortName: "MEX", fifaCode: "MEX", group: "A", fifaRanking: 15, confederation: "CONCACAF", flagEmoji: "\ud83c\uddf2\ud83c\uddfd" },
  { id: "col", name: "Colombia", shortName: "COL", fifaCode: "COL", group: "A", fifaRanking: 12, confederation: "CONMEBOL", flagEmoji: "\ud83c\udde8\ud83c\uddf4" },
  { id: "sen", name: "Senegal", shortName: "SEN", fifaCode: "SEN", group: "A", fifaRanking: 20, confederation: "CAF", flagEmoji: "\ud83c\uddf8\ud83c\uddf3" },
  { id: "nzl", name: "New Zealand", shortName: "NZL", fifaCode: "NZL", group: "A", fifaRanking: 93, confederation: "OFC", flagEmoji: "\ud83c\uddf3\ud83c\uddff" },

  // Group B
  { id: "por", name: "Portugal", shortName: "POR", fifaCode: "POR", group: "B", fifaRanking: 6, confederation: "UEFA", flagEmoji: "\ud83c\uddf5\ud83c\uddf9" },
  { id: "irn", name: "Iran", shortName: "IRN", fifaCode: "IRN", group: "B", fifaRanking: 21, confederation: "AFC", flagEmoji: "\ud83c\uddee\ud83c\uddf7" },
  { id: "par", name: "Paraguay", shortName: "PAR", fifaCode: "PAR", group: "B", fifaRanking: 55, confederation: "CONMEBOL", flagEmoji: "\ud83c\uddf5\ud83c\uddfe" },
  { id: "crc", name: "Costa Rica", shortName: "CRC", fifaCode: "CRC", group: "B", fifaRanking: 52, confederation: "CONCACAF", flagEmoji: "\ud83c\udde8\ud83c\uddf7" },

  // Group C
  { id: "uru", name: "Uruguay", shortName: "URU", fifaCode: "URU", group: "C", fifaRanking: 11, confederation: "CONMEBOL", flagEmoji: "\ud83c\uddfa\ud83c\uddfe" },
  { id: "bol", name: "Bolivia", shortName: "BOL", fifaCode: "BOL", group: "C", fifaRanking: 82, confederation: "CONMEBOL", flagEmoji: "\ud83c\udde7\ud83c\uddf4" },
  { id: "kor", name: "South Korea", shortName: "KOR", fifaCode: "KOR", group: "C", fifaRanking: 22, confederation: "AFC", flagEmoji: "\ud83c\uddf0\ud83c\uddf7" },
  { id: "cmr", name: "Cameroon", shortName: "CMR", fifaCode: "CMR", group: "C", fifaRanking: 48, confederation: "CAF", flagEmoji: "\ud83c\udde8\ud83c\uddf2" },

  // Group D
  { id: "bra", name: "Brazil", shortName: "BRA", fifaCode: "BRA", group: "D", fifaRanking: 5, confederation: "CONMEBOL", flagEmoji: "\ud83c\udde7\ud83c\uddf7" },
  { id: "ita", name: "Italy", shortName: "ITA", fifaCode: "ITA", group: "D", fifaRanking: 9, confederation: "UEFA", flagEmoji: "\ud83c\uddee\ud83c\uddf9" },
  { id: "tun", name: "Tunisia", shortName: "TUN", fifaCode: "TUN", group: "D", fifaRanking: 39, confederation: "CAF", flagEmoji: "\ud83c\uddf9\ud83c\uddf3" },
  { id: "hon", name: "Honduras", shortName: "HON", fifaCode: "HON", group: "D", fifaRanking: 73, confederation: "CONCACAF", flagEmoji: "\ud83c\udded\ud83c\uddf3" },

  // Group E
  { id: "arg", name: "Argentina", shortName: "ARG", fifaCode: "ARG", group: "E", fifaRanking: 1, confederation: "CONMEBOL", flagEmoji: "\ud83c\udde6\ud83c\uddf7" },
  { id: "per", name: "Peru", shortName: "PER", fifaCode: "PER", group: "E", fifaRanking: 35, confederation: "CONMEBOL", flagEmoji: "\ud83c\uddf5\ud83c\uddea" },
  { id: "ukr", name: "Ukraine", shortName: "UKR", fifaCode: "UKR", group: "E", fifaRanking: 23, confederation: "UEFA", flagEmoji: "\ud83c\uddfa\ud83c\udde6" },
  { id: "mar", name: "Morocco", shortName: "MAR", fifaCode: "MAR", group: "E", fifaRanking: 13, confederation: "CAF", flagEmoji: "\ud83c\uddf2\ud83c\udde6" },

  // Group F
  { id: "usa", name: "United States", shortName: "USA", fifaCode: "USA", group: "F", fifaRanking: 14, confederation: "CONCACAF", flagEmoji: "\ud83c\uddfa\ud83c\uddf8" },
  { id: "eng", name: "England", shortName: "ENG", fifaCode: "ENG", group: "F", fifaRanking: 4, confederation: "UEFA", flagEmoji: "\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f" },
  { id: "chn", name: "China PR", shortName: "CHN", fifaCode: "CHN", group: "F", fifaRanking: 88, confederation: "AFC", flagEmoji: "\ud83c\udde8\ud83c\uddf3" },
  { id: "pan", name: "Panama", shortName: "PAN", fifaCode: "PAN", group: "F", fifaRanking: 43, confederation: "CONCACAF", flagEmoji: "\ud83c\uddf5\ud83c\udde6" },

  // Group G
  { id: "fra", name: "France", shortName: "FRA", fifaCode: "FRA", group: "G", fifaRanking: 2, confederation: "UEFA", flagEmoji: "\ud83c\uddeb\ud83c\uddf7" },
  { id: "aut", name: "Austria", shortName: "AUT", fifaCode: "AUT", group: "G", fifaRanking: 19, confederation: "UEFA", flagEmoji: "\ud83c\udde6\ud83c\uddf9" },
  { id: "idn", name: "Indonesia", shortName: "IDN", fifaCode: "IDN", group: "G", fifaRanking: 128, confederation: "AFC", flagEmoji: "\ud83c\uddee\ud83c\udde9" },
  { id: "can", name: "Canada", shortName: "CAN", fifaCode: "CAN", group: "G", fifaRanking: 42, confederation: "CONCACAF", flagEmoji: "\ud83c\udde8\ud83c\udde6" },

  // Group H
  { id: "esp", name: "Spain", shortName: "ESP", fifaCode: "ESP", group: "H", fifaRanking: 3, confederation: "UEFA", flagEmoji: "\ud83c\uddea\ud83c\uddf8" },
  { id: "svk", name: "Slovakia", shortName: "SVK", fifaCode: "SVK", group: "H", fifaRanking: 45, confederation: "UEFA", flagEmoji: "\ud83c\uddf8\ud83c\uddf0" },
  { id: "alg", name: "Algeria", shortName: "ALG", fifaCode: "ALG", group: "H", fifaRanking: 31, confederation: "CAF", flagEmoji: "\ud83c\udde9\ud83c\uddff" },
  { id: "aus", name: "Australia", shortName: "AUS", fifaCode: "AUS", group: "H", fifaRanking: 24, confederation: "AFC", flagEmoji: "\ud83c\udde6\ud83c\uddfa" },

  // Group I
  { id: "ger", name: "Germany", shortName: "GER", fifaCode: "GER", group: "I", fifaRanking: 8, confederation: "UEFA", flagEmoji: "\ud83c\udde9\ud83c\uddea" },
  { id: "cze", name: "Czech Republic", shortName: "CZE", fifaCode: "CZE", group: "I", fifaRanking: 36, confederation: "UEFA", flagEmoji: "\ud83c\udde8\ud83c\uddff" },
  { id: "jpn", name: "Japan", shortName: "JPN", fifaCode: "JPN", group: "I", fifaRanking: 16, confederation: "AFC", flagEmoji: "\ud83c\uddef\ud83c\uddf5" },
  { id: "ecu", name: "Ecuador", shortName: "ECU", fifaCode: "ECU", group: "I", fifaRanking: 33, confederation: "CONMEBOL", flagEmoji: "\ud83c\uddea\ud83c\udde8" },

  // Group J
  { id: "ned", name: "Netherlands", shortName: "NED", fifaCode: "NED", group: "J", fifaRanking: 7, confederation: "UEFA", flagEmoji: "\ud83c\uddf3\ud83c\uddf1" },
  { id: "den", name: "Denmark", shortName: "DEN", fifaCode: "DEN", group: "J", fifaRanking: 17, confederation: "UEFA", flagEmoji: "\ud83c\udde9\ud83c\uddf0" },
  { id: "nga", name: "Nigeria", shortName: "NGA", fifaCode: "NGA", group: "J", fifaRanking: 28, confederation: "CAF", flagEmoji: "\ud83c\uddf3\ud83c\uddec" },
  { id: "uga", name: "Uganda", shortName: "UGA", fifaCode: "UGA", group: "J", fifaRanking: 77, confederation: "CAF", flagEmoji: "\ud83c\uddfa\ud83c\uddec" },

  // Group K
  { id: "bel", name: "Belgium", shortName: "BEL", fifaCode: "BEL", group: "K", fifaRanking: 10, confederation: "UEFA", flagEmoji: "\ud83c\udde7\ud83c\uddea" },
  { id: "srb", name: "Serbia", shortName: "SRB", fifaCode: "SRB", group: "K", fifaRanking: 32, confederation: "UEFA", flagEmoji: "\ud83c\uddf7\ud83c\uddf8" },
  { id: "chi", name: "Chile", shortName: "CHI", fifaCode: "CHI", group: "K", fifaRanking: 38, confederation: "CONMEBOL", flagEmoji: "\ud83c\udde8\ud83c\uddf1" },
  { id: "sau", name: "Saudi Arabia", shortName: "KSA", fifaCode: "KSA", group: "K", fifaRanking: 56, confederation: "AFC", flagEmoji: "\ud83c\uddf8\ud83c\udde6" },

  // Group L
  { id: "cro", name: "Croatia", shortName: "CRO", fifaCode: "CRO", group: "L", fifaRanking: 18, confederation: "UEFA", flagEmoji: "\ud83c\udded\ud83c\uddf7" },
  { id: "wal", name: "Wales", shortName: "WAL", fifaCode: "WAL", group: "L", fifaRanking: 25, confederation: "UEFA", flagEmoji: "\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f" },
  { id: "gha", name: "Ghana", shortName: "GHA", fifaCode: "GHA", group: "L", fifaRanking: 63, confederation: "CAF", flagEmoji: "\ud83c\uddec\ud83c\udded" },
  { id: "jam", name: "Jamaica", shortName: "JAM", fifaCode: "JAM", group: "L", fifaRanking: 62, confederation: "CONCACAF", flagEmoji: "\ud83c\uddef\ud83c\uddf2" },
];

export const TEAM_MAP: Record<string, Team> = Object.fromEntries(
  TEAMS.map((t) => [t.id, t])
);

export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const;

export function getTeamsByGroup(group: string): Team[] {
  return TEAMS.filter((t) => t.group === group);
}
